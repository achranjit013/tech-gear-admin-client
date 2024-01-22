import { useEffect } from "react";
import { Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllCats } from "../../pages/category/categoryAction";

function CategoryTable() {
  const dispatch = useDispatch();
  const { catList } = useSelector((state) => state.catInfo);

  useEffect(() => {
    dispatch(getAllCats());
  }, [dispatch]);

  return (
    <Table striped bordered hover>
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
            <td
              className={status === "active" ? "text-success" : "text-danger"}
            >
              {status}
            </td>
            <td>{title}</td>
            <td>{slug}</td>
            <td>{createdAt?.slice(0, 10)}</td>
            <td>
              <Button variant="warning">Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default CategoryTable;
