import classes from "./product-table.module.css";

const ProductTable = (props) => {
  const products = props.products;

  const updateHandler = (productId) => {};
  const deleteHandler = (productId) => {
    props.crud("delete", productId);
  };
  // create data row inside table
  const tableData = products.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item._id}</td>
        <td className={classes.product}>{item.name}</td>
        <td className={classes.price}>
          {Intl.NumberFormat("vi").format(Number(item.price))}
        </td>
        <td>
          <img src={item.images[0]} alt={item.name} />
        </td>
        <td>{item.category}</td>
        <td className={classes.edit}>
          <span
            className={classes.update}
            onClick={updateHandler.bind(null, item._id)}
          >
            Update
          </span>
          <span
            className={classes.delete}
            onClick={deleteHandler.bind(null, item._id)}
          >
            Delete
          </span>
        </td>
      </tr>
    );
  });

  return (
    <>
      {/* Table */}
      <table className={classes["cart-table"]}>
        <thead>
          <tr className={classes.header}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th width="8%">Image</th>
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </>
  );
};
export default ProductTable;
