import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExistingCat,
  getAllCats,
} from "../../pages/category/categoryAction";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import CustomModal from "../custom-modal/CustomModal";
import { setShowModal } from "../custom-modal/modalSlice";
import UpdateCategory from "../category/UpdateCategory";
import CustomInput from "../custom-input/CustomInput";
import { format, parseISO } from "date-fns";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CategoryTable() {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const [updateCategory, setUpdateCategory] = useState({});
  const [fileteredCategoryList, setFileteredCategoryList] = useState();

  useEffect(() => {
    dispatch(getAllCats());

    if (catList?.length > 0) {
      setFileteredCategoryList(catList);
    }
  }, [dispatch, catList?.length]);

  const handleOnSearch = (e) => {
    const filteredResult = catList.filter(
      (cat) =>
        cat.title.includes(e.target.value) || cat.slug.includes(e.target.value)
    );
    setFileteredCategoryList(filteredResult);
  };

  const handleOnEditBtn = (catObj) => {
    setUpdateCategory(catObj);
    dispatch(setShowModal(true));
  };

  const handleOnCategoryDelete = ({ _id, title }) => {
    if (window.confirm(`Are you sure to delete ${title}?`)) {
      return dispatch(deleteExistingCat(_id));
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
          <h4>Category List</h4>
        </Col>
        <Col md={6}>
          <CustomInput {...obj} onChange={handleOnSearch} />
        </Col>
      </Row>

      {fileteredCategoryList?.length > 0 ? (
        <>
          <CustomModal title="Category update form!">
            <UpdateCategory {...updateCategory} />
          </CustomModal>

          <Table striped bordered className="overflow-hidden rounded shadow">
            <thead>
              <tr>
                <th>#</th>
                <th>Status</th>
                <th>Title</th>
                <th>Slug</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fileteredCategoryList.map(
                ({ _id, title, status, slug, createdAt }, i) => (
                  <tr key={_id}>
                    <td>{i + 1}</td>
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
                    <td className="text-capitalize">{title}</td>
                    <td>{slug}</td>
                    <td>{format(parseISO(createdAt), "yyyy/MM/dd")}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant="warning"
                          onClick={() =>
                            handleOnEditBtn({ _id, title, status })
                          }
                          className="p-2 d-flex justify-content-center align-items-center"
                        >
                          <FaEdit />
                        </Button>

                        {status === "inactive" && (
                          <Button
                            variant="danger"
                            className="p-2 d-flex justify-content-center align-items-center"
                            onClick={() =>
                              handleOnCategoryDelete({ _id, title })
                            }
                          >
                            <MdDelete />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
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

export default CategoryTable;
