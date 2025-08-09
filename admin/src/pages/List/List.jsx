import React, { useEffect, useState, useRef } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEdit, FaTrash, FaSave, FaTimes, FaImage } from "react-icons/fa";

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({
    id: "",
    name: "",
    category: "",
    description: "",
    price: "",
    image: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, id: null });
  const fileInputRef = useRef(null);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error fetching food list");
    }
  };

  const removeFood = async (foodId) => {
    setDeleteConfirm({ show: true, id: foodId });
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: deleteConfirm.id });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchList();
      } else {
        toast.error("Error removing food");
      }
    } catch (error) {
      toast.error("Server error while deleting food");
    } finally {
      setDeleteConfirm({ show: false, id: null });
    }
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setEditForm({
      id: item._id,
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price,
      image: null,
    });
    setImagePreview(item.image);
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      const file = files[0];
      setEditForm((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    } else {
      setEditForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const triggerImageSelect = () => {
    fileInputRef.current.click();
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editForm.id);
      formData.append("name", editForm.name);
      formData.append("category", editForm.category);
      formData.append("description", editForm.description);
      formData.append("price", editForm.price);

      if (editForm.image) {
        formData.append("image", editForm.image);
      }

      const response = await axios.put(`${url}/api/food/edit`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success(response.data.message || "Food updated successfully");
        setEditItem(null);
        fetchList();
      } else {
        toast.error(response.data.message || "Error updating food");
      }
    } catch (error) {
      console.error("Edit request error:", error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

    return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <div>
              <button onClick={() => openEditModal(item)}>
                <FaEdit className="icon" />
              </button>
              <button onClick={() => removeFood(item._id)}>
                <FaTrash className="icon" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Food</h2>
            {/* ... (keep all your existing form inputs) */}
            <div className="modal-actions">
              <button onClick={saveEdit}>
                <FaSave className="icon" /> Save
              </button>
              <button onClick={() => setEditItem(null)}>
                <FaTimes className="icon" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Are you sure you want to delete this food?</h3>
            <div className="modal-actions">
              <button onClick={confirmDelete}>
                <FaTrash className="icon" /> Delete
              </button>
              <button onClick={() => setDeleteConfirm({ show: false, id: null })}>
                <FaTimes className="icon" /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
