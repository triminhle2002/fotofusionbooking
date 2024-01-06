import { storage } from '../config/firebase.config';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject,
    list,
} from "firebase/storage";
// Hàm xóa hình ảnh từ Firebase Storage
const deleteImage = async (imagePath) => {
    try {
        const imageRef = ref(storage, imagePath);

        // Kiểm tra xem hình ảnh có tồn tại hay không
        const exists = await getDownloadURL(imageRef).then(() => true).catch(() => false);

        if (exists) {
            // Nếu hình ảnh tồn tại, xóa nó
            await deleteObject(imageRef);
            console.log('Hình ảnh đã được xóa thành công.');
            return true;
        } else {
            console.log('Hình ảnh không tồn tại.');
        }
    } catch (error) {
        console.error('Lỗi khi xóa hình ảnh:', error);
        throw error;
    }
}
const deleteImagesByUrls = async (imageUrls) => {
    try {
        const deletedImages = [];

        for (const imageUrl of imageUrls) {
            const imageRef = ref(storage, imageUrl);

            // Kiểm tra xem hình ảnh có tồn tại hay không
            const exists = await getDownloadURL(imageRef)
                .then(() => true)
                .catch(() => false);

            if (exists) {
                // Nếu hình ảnh tồn tại, xóa nó
                await deleteObject(imageRef);
                console.log(`Hình ảnh từ URL ${imageUrl} đã được xóa thành công.`);
                deletedImages.push(imageUrl);
            } else {
                console.log(`Hình ảnh từ URL ${imageUrl} không tồn tại.`);
            }
        }

        return deletedImages;
    } catch (error) {
        console.error('Lỗi khi xóa hình ảnh:', error);
        throw error;
    }
};
export {
    deleteImage,
    deleteImagesByUrls
}

