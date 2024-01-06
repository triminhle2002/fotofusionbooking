export function formatDateTime(dateTimeString) {
    // Tạo đối tượng Date từ chuỗi thời gian
    if (!dateTimeString) {
        return "Không có thời gian"
    }
    const dateTime = new Date(dateTimeString);

    // Lấy thông tin ngày, tháng, năm, giờ và phút
    const day = dateTime.getDate().toString().padStart(2, '0');
    const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
    const year = dateTime.getFullYear();
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');

    // Tạo chuỗi định dạng
    const formattedDateTime = `${day}-${month}-${year} ${hours} giờ ${minutes} phút`;

    return formattedDateTime;
}
export function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0, // Số chữ số sau dấu phẩy
        maximumFractionDigits: 0,
    });

    const formattedAmount = formatter.format(amount).replace(/\./g, ',');
    return formattedAmount;
}