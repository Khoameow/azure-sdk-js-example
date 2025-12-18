import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

// --- THAY THẾ CÁC BIẾN NÀY ---
const date= Date.now().toString().slice(-4);
const subscriptionId = "2f322719-b404-4fd0-b7dc-7bc7dbb5899f"; // ID Đăng ký Azure của bạn
const resourceGroupName = "azure-portal"; // Tên Nhóm tài nguyên
const accountName = "azureportalbuckets" + date; // Tên tài khoản lưu trữ (phải là duy nhất toàn cầu)
const location = "Central Us"; // Vùng (Region)
// -----------------------------

async function createStorageAccount() {
    try {
        console.log("Đang xác thực bằng DefaultAzureCredential...");
        // Xác thực
        const credential = new DefaultAzureCredential();

        // Tạo Client cho quản lý tài khoản lưu trữ
        const client = new StorageManagementClient(credential, subscriptionId);

        console.log(`Bắt đầu tạo Tài khoản Lưu trữ "${accountName}" tại vùng ${location}...`);

        // Cấu hình tài khoản lưu trữ
        const parameters = {
            location: location,
            sku: {
                name: "Standard_LRS" // SKU: Standard_LRS (Locally-redundant storage)
            },
            kind: "StorageV2" // Loại: StorageV2 (dành cho mục đích chung)
        };

        // Gửi yêu cầu tạo tài khoản
        const result = await client.storageAccounts.beginCreateAndWait(
            resourceGroupName,
            accountName,
            parameters
        );

        console.log("✅ Tạo Tài khoản Lưu trữ thành công!");
        console.log(`Tên tài khoản: ${result.name}`);
        console.log(`Endpoint Blob: ${result.primaryEndpoints.blob}`);

    } catch (error) {
        console.error("❌ Lỗi khi tạo Tài khoản Lưu trữ:", error.message);
        throw error;
    }
}

createStorageAccount();