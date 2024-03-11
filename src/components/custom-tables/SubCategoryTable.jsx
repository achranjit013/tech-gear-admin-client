import React, { useEffect, useState } from "react";
import { Button, Form, Col, Row } from "react-bootstrap";
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
import CustomInput from "../custom-input/CustomInput";

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
  const [fileteredSubCategoryList, setFileteredSubCategoryList] = useState();

  useEffect(() => {
    dispatch(getAllCats());
    dispatch(getAllSubCats());
    setSelectedCategory(null);
    setSelectedSubcategory(null);
    setSelectedTitle(null);
    setSelectedStatus(null);

    if (subCatList?.length > 0) {
      setFileteredSubCategoryList(subCatList);
    }
  }, [
    dispatch,
    subCatList.reduce((count, obj) => {
      return count + obj.subCategories.length;
    }, 0),
  ]);

  const handleOnSearch = (e) => {
    const filteredArray = subCatList
      .map((outerObj) => {
        const innerArray = outerObj.subCategories;

        const matchingObjects = innerArray.filter((innerObj) => {
          const { title, slug } = innerObj;
          return (
            title.includes(e.target.value) || slug.includes(e.target.value)
          );
        });

        return { ...outerObj, subCategories: matchingObjects };
      })
      .filter((outerObj) => outerObj.subCategories.length > 0);

    setFileteredSubCategoryList(filteredArray);
  };

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

  const obj = {
    name: "search",
    placeholder: "Search by title or slug",
    type: "text",
  };

  return (
    <>
      <Row className="d-flex justify-content-between align-items-end">
        <Col md={6} className="mb-md-3">
          <h4>Subcategory List</h4>
        </Col>
        <Col md={6}>
          <CustomInput {...obj} onChange={handleOnSearch} />
        </Col>
      </Row>

      {fileteredSubCategoryList?.length > 0 ? (
        <>
          <CustomModal title="Subcategory update form!">
            <UpdateSubCategory {...updateSubcategory} />
          </CustomModal>

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
              {fileteredSubCategoryList?.map(
                ({ _id: catId, subCategories }, index) => (
                  <React.Fragment key={catId}>
                    {subCategories.map(
                      ({ _id, title, slug, status, createdAt }, subIndex) => (
                        <tr key={_id}>
                          {subIndex === 0 && (
                            <td
                              rowSpan={subCategories.length}
                              className="text-capitalize"
                            >
                              {
                                catList.filter((item) => item._id === catId)[0]
                                  .title
                              }
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
                            <span className="text-capitalize">{title}</span> (
                            {slug})
                          </td>
                          <td className="text-white">
                            <span
                              className={classNames(
                                status === "active"
                                  ? "bg-success"
                                  : "bg-danger",
                                "p-1 rounded"
                              )}
                            >
                              {status}
                            </span>
                          </td>
                          <td>{format(new Date(createdAt), "yyyy/MM/dd")}</td>
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
                )
              )}
            </tbody>
          </Table>
        </>
      ) : (
        <p className="text-center mt-5">No data to display</p>
      )}
    </>
  );
}

export default SubCategoryTable;
