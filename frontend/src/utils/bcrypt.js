import bcrypt from "bcryptjs";

export const hashText = async (plainText) => {
	return await bcrypt.hash(plainText, 10);
};
