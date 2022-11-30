import { ObjectID } from "mongodb";
import {
  findOne,
  insertOne,
  findMany,
  updateOne,
  deleteOne,
} from "../db/index";

export interface Product {
  name: String;
  photos: String[];
  mainImage: Number;
  shipping?: String;
  return?: String;
  infoGuide?: String;
  price: Number;
  views?: Number;
  sale?: Number;
  options?: {}[];
  description: String;
  properties?: {}[];
  stock: Number;
  sku?: String;
  category?: String;
  subCategory?: String;
  intro?: {};
  additionalInfo?: string;
}

export interface ProductUpdate {
  views?: Number;
}

const getAllProductsProj = {
  name: 1,
  description: 1,
  photos: 1,
  mainImage: 1,
  shipping: 1,
  return: 1,
  infoGuide: 1,
  price: 1,
  sale: 1,
  options: 1,
  stock: 1,
  sku: 1,
  category: 1,
  subCategory: 1,
};
const getRecentProductsProj = {
  name: 1,
  photos: 1,
  mainImage: 1,
  price: 1,
};

const searchProductProj = {
  name: 1,
  photos: { $slice: 1 },
  price: 1,
  category: 1,
  subCategory: 1,
};

export const findProductWithId = async (id: string) => {
  const productId = new ObjectID(id);

  const product = await findOne("products", { _id: productId });

  return product;
};

export const getAllProducts = async (
  limit: number,
  skip: number = 0,
  category?: string,
  subCategory?: string
) => {

  const options = { projection: getAllProductsProj };

  console.log('skip')
  console.log(skip)
  console.log('limit')
  console.log(limit)

  if (category && subCategory)
    return await findMany(
      "products",
      { category: { $in: [category] }, subCategory: { $in: [subCategory] } },
      options,
      skip,
      limit,
      "views"
    );
  else if (category)
    return await findMany(
      "products",
      { category: { $in: [category] } },
      options,
      skip,
      limit,
      "views"
    );
  else return await findMany("products", {}, options, skip, limit, "views");
};

export const searchProducts = async (tag: string) => {
  const options = { limit: 8, projection: searchProductProj };

  const regex = new RegExp(tag, "gi");

  return await findMany(
    "products",
    {
      $or: [
        { category: { $in: [tag] } },
        { subCategory: { $in: [tag] } },
        { name: { $regex: regex } },
      ],
    },
    options,
    0,
    0,
    "views"
  );
};

export const getRecentProducts = async (id?: string) => {
  const convertedId = new ObjectID(id);

  const query = id ? { _id: { $ne: convertedId } } : {};

  // console.log("getting recent products");
  // console.log("query:");
  // console.log(query);

  return await findMany(
    "products",
    query,
    { projection: getRecentProductsProj },
    0,
    10,
    "created_at"
  );
};

export const createProduct = async (newProduct: Product) => {
  const product = await insertOne("products", newProduct);

  return product?.result.ok;
};

export const updateProduct = async (
  rowId: string,
  updateFields: ProductUpdate
) => {
  const productId = new ObjectID(rowId);

  const product = await updateOne(
    "products",
    { _id: productId },
    { $set: updateFields }
  );

  return product?.result.ok;
};

export const toggleProductFavorites = async (
  userId: string,
  productId: string
) => {
  const isProductFavoritted = await findOne("favorites", { userId, productId });

  if (isProductFavoritted) {
    const deleteFavoritted = await deleteOne("favorites", {
      userId,
      productId,
    });

    return deleteFavoritted;
  } else {
    const newFavorite = {
      userId,
      productId,
    };

    const addedToFavorites = await insertOne("favorites", newFavorite);

    return addedToFavorites;
  }
};

export const findUserFavorites = async (
  userId: string,
  productIds: string[]
) => {
  const product_ids = productIds.map((id) => new ObjectID(id));
  const user_id = new ObjectID(userId);

  const addedToFavorites = await findOne("favorites", {
    $and: [{ userId: user_id }, { productId: { $in: product_ids } }],
  });

  return addedToFavorites;
};
