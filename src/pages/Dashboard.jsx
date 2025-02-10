import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { getOwnerIdFromToken } from "../utils/middleware";
import { useAlert } from "../components/Alert";

const AddAssetModal = ({ asset, categories, onAssetAdded }) => {
    const { showAlert } = useAlert();

    const [formData, setFormData] = useState({
        name: asset?.name || "",
        category: asset?.category?.name || "",
        value: asset?.value || "",
        description: asset?.description || "",
    });
    useEffect(() => {
        if (asset) {
            setFormData({
                name: asset.name,
                category: asset.category._id,
                value: asset.value,
                description: asset.description,
            });
        }
    }, [asset]);
    // Extract ownerId from token in localStorage


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ownerId = getOwnerIdFromToken();
        if (!ownerId) {
            showAlert("error", "User not authenticated!");
            return;
        }

        try {
            const url = asset
                ? `/asset/edit/${asset?._id}`
                : `/asset/add`;

            const response = await axiosInstance.post(`${url}`, {
                ownerId,
                ...formData,
            });

            if (response.status === 201) {
                showAlert("success", "Asset added successfully!");
            } else if (response.status === 200) {
                if (asset) {
                    showAlert("success", "Asset Updated successfully!");
                }
            }
            document.getElementById("my_modal_1").close();
            setFormData({ name: "", category: "", value: "", description: "" });
            onAssetAdded(); // Refresh asset list in Dashboard
        } catch (error) {
            console.error("Error adding asset:", error);
            showAlert("error", `Failed to add asset. ${error.response.data.message}`);
        }
    };

    return (
        <dialog id="my_modal_1" className="modal">

            <div className="modal-box w-11/12 max-w-5xl bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6">

                <h3 className="text-lg font-bold">{asset?.name ? "Update Asset Details" : "Add New Asset"}</h3>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Asset Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter asset name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Value (₹)</label>
                        <input
                            type="number"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            placeholder="Enter value"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium dark:text-gray-300">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter description"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>

                    <div className="modal-action flex justify-between">
                        <button type="submit" className="btn btn-primary ">
                            {asset?.name ? "Update" : "Add Asset"}
                        </button>
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

const CategoryModal = ({ onSuccess }) => {
    const { showAlert } = useAlert();

    const [name, setName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`/category/add`, { name, OwnerId: getOwnerIdFromToken() });
            await onSuccess();
            showAlert("success", "Category added successfully!");
        } catch (error) {
            console.error("Error:", error);
            showAlert("error", `Failed to add category. ${error.response.data.message}`);
        }
    };

    return (

        <dialog id="category_modal" className="modal">
            <div className="modal-box  bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6">
                <h3 className="font-bold text-lg">Hello! Add new category</h3>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Category Name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                <div className="modal-action">
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary ">Add</button>

                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};
const ConfimationModel = ({ title, setConfirm }) => {


    return (

        <dialog id="ConfimationModel" className="modal">
            <div className="modal-box  bg-white dark:bg-gray-800 dark:text-white rounded-lg p-6">
                <h3 className="font-bold text-lg">{title}</h3>
                <div className="modal-action">
                    <button type="submit" onClick={setConfirm(true)} className="btn btn-error ">Delete</button>
                    <form method="dialog">
                        {/* if there is a button, it will close the modal */}
                        <button className="btn" onClick={setConfirm(false)}>Cancel</button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};


const Dashboard = () => {
    const { showAlert } = useAlert();

    const [assets, setAssets] = useState([]);
    const [categories, setCategories] = useState([]);
    const [totalAssets, setTotalAssets] = useState(0);
    const [totalValue, setTotalValue] = useState(0);
    const [categoryData, setCategoryData] = useState({});
    const [SelectedAsset, setSelectedAsset] = useState();

    useEffect(() => {
        fetchDashboardData();
    }, []);
    const handleEdit = (asset) => {
        setSelectedAsset(asset); // Set asset to state
        document.getElementById("my_modal_1").showModal(); // Open modal
    };
    const fetchDashboardData = async () => {
        try {
            const ownerId = getOwnerIdFromToken(); // Replace with actual ownerId
            const assetResponse = await axiosInstance.post(`/asset/all/${ownerId}`);
            const assetDashboardResponse = await axiosInstance.post(`/asset/dashboard/${ownerId}`);
            const categoryResponse = await axiosInstance.get(`/category/all/${ownerId}`);

            setAssets(assetResponse.data);
            setCategories(categoryResponse.data);
            setTotalAssets(assetDashboardResponse.data.totalAssets);
            setTotalValue(assetDashboardResponse.data.totalValue);
            setCategoryData(assetDashboardResponse.data.categoryData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const handleDeleteCat = async (id) => {
        if (window.confirm("Are you sure you want to delete this Category?")) {
            try {
                await axiosInstance.post(`/Category/remove/${id}`);
                showAlert("success", "Category deleted successfully!");
                fetchDashboardData(); // Refresh data
            } catch (error) {
                console.error("Error:", error);
                showAlert("error", `Failed to delete asset. ${error.response.data.message}`);
            }
        }
    };
    const handleDeleteAsset = async (id) => {
        if (window.confirm("Are you sure you want to delete this asset?")) {
            try {
                await axiosInstance.post(`/asset/remove/${id}`);
                showAlert("success", "Asset deleted successfully!");
                fetchDashboardData(); // Refresh data
            } catch (error) {
                console.error("Error:", error.response.data);
                showAlert("error", `Failed to delete asset. ${error.response.data.message}`);
            }
        }
    };
    return (
        <div className="p-6 space-y-6 bg-gray-100 dark:bg-gray-900 ">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Assets</h2>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{totalAssets}</p>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Total Value</h2>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{totalValue}</p>
                </div>

                <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Categories</h2>
                    <ul className="text-gray-600 dark:text-gray-300">
                        {Object.keys(categoryData)?.map((category) => (
                            <li key={category}>
                                {category}: {categoryData[category].count} assets
                            </li>
                        ))}
                    </ul>
                </div>
            </div>


            {/* Asset & Category Tables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Assets Table */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Assets</h2>
                        <button className="btn btn-outline btn-sm btn-primary" onClick={() => document.getElementById('my_modal_1').showModal()}>Add Asset</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                                <tr>
                                    <th className="border border-gray-300 dark:border-gray-600 p-2">Name</th>
                                    <th className="border border-gray-300 dark:border-gray-600 p-2">Category</th>
                                    <th className="border border-gray-300 dark:border-gray-600 p-2">Value</th>
                                    <th className="border border-gray-300 dark:border-gray-600 p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assets.map((asset) => (
                                    <tr key={asset._id} className="text-gray-800 dark:text-gray-300">
                                        <td className="border border-gray-300 dark:border-gray-600 p-2">{asset.name}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 p-2">{asset.category.name}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 p-2">₹{asset.value}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 p-2">
                                            <button
                                                className="px-3 py-1 bg-blue-500 text-white rounded-md mr-2"
                                                onClick={() => handleEdit(asset)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded-md"
                                                onClick={() => handleDeleteAsset(asset._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Categories Table */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                    <div className="flex justify-between">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Categories</h2>
                        <button className="btn btn-outline btn-sm btn-primary" onClick={() => document.getElementById('category_modal').showModal()}>Add Categories</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-200 dark:border-gray-700">
                            <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                                <tr>
                                    <th className="border border-gray-300 dark:border-gray-600 p-2">Name</th>
                                    <th className="border border-gray-300 dark:border-gray-600 p-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category) => (
                                    <tr key={category._id} className="text-gray-800 dark:text-gray-300">
                                        <td className="border border-gray-300 dark:border-gray-600 p-2">{category.name}</td>
                                        <td className="border border-gray-300 dark:border-gray-600 p-2">
                                            <button
                                                className="px-3 py-1 bg-red-500 text-white rounded-md"
                                                onClick={() => handleDeleteCat(category._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <AddAssetModal asset={SelectedAsset} categories={categories} onAssetAdded={fetchDashboardData} />
            <CategoryModal onSuccess={fetchDashboardData} />

        </div>
    );
};

export default Dashboard;
