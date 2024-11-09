export function isValidObjectId(id: string): boolean {
    if (!id) return false;
    // MongoDB ObjectId is a 24-character hex string
    return /^[0-9a-fA-F]{24}$/.test(id);
}