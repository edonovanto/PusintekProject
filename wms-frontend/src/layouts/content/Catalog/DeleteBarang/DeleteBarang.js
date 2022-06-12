import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import swal from "sweetalert";

import { DELETE_STUFF } from "../../../../utils/constant";

function DeleteBarang({ barang_id }) {
  const handleDelete = () => {
    const config = {
      method: "delete",
      url: `${DELETE_STUFF}/${barang_id}`,
    };

    swal({
      title: "Are you sure?",
      text: "Ketika dihapus, data tidak dapat dipulihkan!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios(config)
          .then((res) => {
            swal({
              title: "Sukses",
              text: "Data barang berhasil dihapus!",
              icon: "success",
            }).then((willReload) => {
              if (willReload) {
                window.location.reload();
              }
            });
          })
          .catch((err) => {
            swal("Error", `Terjadi kesalahan saat memproses data!`, "error");
          });
      } else {
        swal("Data barang tidak jadi dihapus!");
      }
    });
  };

  return (
    <>
      <AiFillDelete
        size="1em"
        className="btn-item__delete m-1"
        onClick={handleDelete}
      />
    </>
  );
}

export default DeleteBarang;
