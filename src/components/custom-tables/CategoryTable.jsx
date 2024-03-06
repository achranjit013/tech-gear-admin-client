import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CategoryTable() {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);
  const [updateCategory, setUpdateCategory] = useState({});

  useEffect(() => {
    dispatch(getAllCats());
  }, [dispatch]);

  const handleOnEditBtn = (catObj) => {
    setUpdateCategory(catObj);
    dispatch(setShowModal(true));
  };

  const handleOnCategoryDelete = ({ _id, title }) => {
    if (window.confirm(`Are you sure to delete ${title}?`)) {
      return dispatch(deleteExistingCat(_id));
    }
  };

  return (
    <>
      <CustomModal title="Category update form!">
        <UpdateCategory {...updateCategory} />
      </CustomModal>

      <h4>Category List</h4>
      <hr />

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
          {catList.map(({ _id, title, status, slug, createdAt }, i) => (
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
              <td>{title}</td>
              <td>{slug}</td>
              <td>{createdAt?.slice(0, 10)}</td>
              <td>
                <div className="d-flex align-items-center gap-2">
                  <Button
                    variant="warning"
                    onClick={() => handleOnEditBtn({ _id, title, status })}
                    className="p-2 d-flex justify-content-center align-items-center"
                  >
                    <FaEdit />
                  </Button>

                  {status === "inactive" && (
                    <Button
                      variant="danger"
                      className="p-2 d-flex justify-content-center align-items-center"
                      onClick={() => handleOnCategoryDelete({ _id, title })}
                    >
                      <MdDelete />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CategoryTable;
