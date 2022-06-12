import React, { useEffect, useState } from "react";
import "./EditBarang.css";
import { AiFillEdit } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import Loading from "../../../../assets/json/8574-loading.json";
import swal from "sweetalert";
import Lottie from "lottie-react";

import {
  UPLOAD_IMAGE,
  EDIT_STUFF,
  GET_SINGLE_STUFF,
} from "../../../../utils/constant";
import axios from "axios";

function EditBarang({ barang_id }) {
  const [name, setName] = useState("");
  const [hargaBeli, setHargaBeli] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);
  const [stockBarang, setStock] = useState(0);
  const [oldFiles, setOldFiles] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [done, setDone] = useState(undefined);

  useEffect(() => {
    const config = {
      method: "get",
      url: `${GET_SINGLE_STUFF}/${barang_id}`,
    };

    axios(config).then((res) => {
      const dataBarang = res.data.data;

      setName(dataBarang.name);
      setHargaBeli(dataBarang.buying_price);
      setHargaJual(dataBarang.selling_price);
      setStock(dataBarang.stock);
      setOldFiles([
        {
          name: `Barang Id: ${barang_id}`,
          preview: dataBarang.image_url,
        },
      ]);
    });
  }, [barang_id]);

  const editBarang = async () => {
    let newFileImage = undefined;
    setDone(true);

    if (
      name === null ||
      hargaBeli === null ||
      hargaJual === null ||
      stockBarang === null
    ) {
      swal("Error", `Pastikan data telah diisi dengan sesuai!`, "error");
      setDone(undefined);
    } else {
      if (newFiles.length > 0) {
        const data = new FormData();
        data.append("file", newFiles[0]);
        data.append("upload_preset", "stuffly");

        const res = await fetch(UPLOAD_IMAGE, {
          method: "post",
          body: data,
        });

        const file = await res.json();
        newFileImage = await file.secure_url;
      }

      const config = {
        method: "put",
        url: `${EDIT_STUFF}/${barang_id}/update`,
        data: {
          name: name,
          image_url: newFileImage || oldFiles[0].preview,
          buying_price: hargaBeli,
          selling_price: hargaJual,
          stock: stockBarang,
        },
      };

      axios(config)
        .then(() => {
          swal({
            title: "Sukses",
            text: "Data barang berhasil diupdate!",
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
      setDone(undefined);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ".jpg, .png",
    maxFiles: 1,
    maxSize: 100000,
    onDropRejected: () => {
      swal("Error", `Pastikan file yang diupload sesuai ketentuan`, "error");
    },
    onDrop: (acceptedFile) => {
      setNewFiles(
        acceptedFile.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const oldImage = oldFiles.map((file) => {
    return (
      <>
        <div key={file.name}>
          <img
            src={file.preview}
            alt="banner preview"
            className="img-upload shadow rounded"
          />
          <p className="pl-1 my-1">
            <strong>[{file.name}]</strong> Pastikan upload gambar memenuhi
            ketentuan
          </p>
        </div>
      </>
    );
  });

  const newImage = newFiles.map((file) => {
    return (
      <>
        <div key={file.name}>
          <img
            src={file.preview}
            alt="banner preview"
            className="img-upload shadow rounded"
          />
          <p className="pl-1 my-1">
            <strong>[{file.name}]</strong> *Ketuk dan tahan gambar untuk
            memperbesar.
          </p>
        </div>
      </>
    );
  });

  return (
    <>
      <AiFillEdit
        size="1em"
        className="btn-item__edit m-1"
        data-toggle="modal"
        data-target={`#modal${barang_id}`}
      />

      {/* MODAL */}
      <div
        class="modal fade"
        id={`modal${barang_id}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Edit Barang
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body px-4 text-left">
              <form>
                <div class="form-group row">
                  <label for="staticEmail" class="col-sm-3 col-form-label">
                    Nama
                  </label>
                  <div class="col-sm-9">
                    <input
                      type="text"
                      class="form-control"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Harga Beli</label>
                  <div class="col-sm-9">
                    <input
                      type="number"
                      name="price"
                      min="1"
                      class="form-control"
                      id="buyingPrice"
                      value={hargaBeli}
                      onChange={(e) => setHargaBeli(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Harga Jual</label>
                  <div class="col-sm-9">
                    <input
                      type="number"
                      name="price"
                      min="1"
                      class="form-control"
                      id="sellingPrice"
                      value={hargaJual}
                      onChange={(e) => setHargaJual(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label class="col-sm-3 col-form-label">Stok</label>
                  <div class="col-sm-9">
                    <input
                      type="number"
                      name="quantity"
                      min="1"
                      class="form-control"
                      id="stock"
                      value={stockBarang}
                      onChange={(e) => setStock(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="mb-0">Upload Gambar</label>
                  <p className="mb-1 info-upload">
                    <small>Max-size: 100kb, Type: png,jpg</small>
                  </p>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                      <div class="upload-image-input border border-secondary rounded-sm">
                        <p className="my-auto">Drop image here..</p>
                      </div>
                    ) : (
                      <div class="upload-image-input border border-secondary rounded">
                        <p className="my-auto">
                          Drag 'n' drop image here, or click to select
                          files
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div>{newImage.length === 0 ? oldImage : newImage}</div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={editBarang}
              >
                Edit
              </button>
              {done && (
                <Lottie
                  animationData={Loading}
                  height={50}
                  width={50}
                  className="loading"
                />
              )}
              {!done && editBarang}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBarang;
