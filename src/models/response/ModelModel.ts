import { BrandModel } from "./BrandModel";


export interface ModelModel {
	id : number;
	name: string;
	brand: BrandModel;
}

export interface GetAllModelModel {
	id: number;
	name: string;
	brand: BrandModel; 
}