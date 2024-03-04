import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../../pages/category/categoryAction";
import { FaEdit } from "react-icons/fa";
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
                <Button
                  variant="warning"
                  onClick={() => handleOnEditBtn({ _id, title, status })}
                  className="p-2 d-flex justify-content-center align-items-center"
                >
                  <FaEdit />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CategoryTable;
