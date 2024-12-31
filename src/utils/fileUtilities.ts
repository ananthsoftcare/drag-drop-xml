import * as path from "path";
import fs from "fs-extra";

export const getFileName = (src: string) => {
	return path.basename(src);
}

export const getExtension = (src: string) => {
	return path.extname(src).toLowerCase();
}

export const copyFile = async (src: string, destination: string) => {
	await fs.copy(src, destination);
}

export const removeFile = async (src: string) => {
	await fs.remove(src);
}