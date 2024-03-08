import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExistingSubCat,
  getAllCats,
  getAllSubCats,
} from "../../pages/category/categoryAction";
import { format } from "date-fns";
import CustomModal from "../custom-modal/CustomModal";
import { setShowModal } from "../custom-modal/modalSlice";
import UpdateSubCategory from "../category/UpdateSubCategory";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function SubCategoryTable() {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const { subCatList } = useSelector((state) => state.catInfo);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [updateSubcategory, setUpdateSubcategory] = useState({});

  useEffect(() => {
    dispatch(getAllCats());
    dispatch(getAllSubCats());
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedTitle(null);
    setSelectedStatus(null);
  }, [dispatch]);

  const handleRadioChange = (categoryId, subcategoryId, title, status) => {
    setSelectedCategory(categoryId);
    setSelectedSubcategory(subcategoryId);
    setSelectedTitle(title);
    setSelectedStatus(status);
  };

  const handleOnEditBtn = () => {
    const subCatObj = {
      categoryId: selectedCategory,
      _id: selectedSubcategory,
      title: selectedTitle,
      status: selectedStatus,
    };
    setUpdateSubcategory(subCatObj);
    dispatch(setShowModal(true));
  };

  const handleOnSubCategoryDelete = () => {
    if (window.confirm(`Are you sure to delete ${selectedTitle}?`)) {
      return dispatch(deleteExistingSubCat(selectedSubcategory));
    }
  };

  return subCatList.length > 0 ? (
    <>
      <CustomModal title="Subcategory update form!">
        <UpdateSubCategory {...updateSubcategory} />
      </CustomModal>

      <h4>Subcategory List</h4>
      <hr />

      <Table striped bordered className="overflow-hidden rounded shadow">
        <thead>
          <tr>
            <th rowSpan={2}>Category</th>
            <th colSpan={3} className="text-center">
              Subcategory
            </th>
            <th rowSpan={2}>Action</th>
          </tr>
          <tr>
            <th>Title (Slug)</th>
            <th>Status</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {subCatList?.map(({ _id: catId, subCategories }, index) => (
            <React.Fragment key={catId}>
              {subCategories.map(
                ({ _id, title, slug, status, createdAt }, subIndex) => (
                  <tr key={_id}>
                    {subIndex === 0 && (
                      <td rowSpan={subCategories.length}>
                        {catList.filter((item) => item._id === catId)[0].title}
                      </td>
                    )}
                    <td>
                      <Form.Check
                        inline
                        name={`group-${catId}`} // Unique name for each group
                        type="radio"
                        id={`radio-${_id}`} // Unique id for each radio button
                        checked={
                          selectedCategory === catId &&
                          selectedSubcategory === _id
                        }
                        onChange={() =>
                          handleRadioChange(catId, _id, title, status)
                        }
                      />
                      {title} ({slug})
                    </td>
                    <td className="text-white">
                      <span
                        className={classNames(
                          status === "active" ? "bg-success" : "bg-danger",
                          "p-1 rounded"
                        )}
                      >
                        {status}
                      </span>
                    </td>
                    <td>{format(new Date(createdAt), "dd/MM/yyyy")}</td>
                    {subIndex === 0 && (
                      <td rowSpan={subCategories.length}>
                        <div className="d-flex align-items-center gap-2">
                          <Button
                            variant="warning"
                            disabled={selectedCategory !== catId}
                            onClick={handleOnEditBtn}
                            className="p-2 d-flex justify-content-center align-items-center"
                          >
                            <FaEdit />
                          </Button>

                          {status === "inactive" &&
                            selectedSubcategory === _id && (
                              <Button
                                variant="danger"
                                className="p-2 d-flex justify-content-center align-items-center"
                                disabled={selectedCategory !== catId}
                                onClick={handleOnSubCategoryDelete}
                              >
                                <MdDelete />
                              </Button>
                            )}
                        </div>
                      </td>
                    )}
                  </tr>
                )
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </>
  ) : (
    <p className="text-center mt-5">No data to display</p>
  );
}

export default SubCategoryTable;
