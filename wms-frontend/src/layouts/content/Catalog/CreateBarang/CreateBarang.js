import React, { useState } from "react";
import "./CreateBarang.css";
import swal from "sweetalert";
import Lottie from "lottie-react";
import Loading from "../../../../assets/json/8574-loading.json";
import { useDropzone } from "react-dropzone";

import { UPLOAD_IMAGE, CREATE_STUFF } from "../../../../utils/constant";
import axios from "axios";

function CreateBarang(props) {
  const [nama, setName] = useState(null);
  const [hargaBeli, setHargaBeli] = useState(null);
  const [hargaJual, setHargaJual] = useState(null);
  const [stock, setStock] = useState(null);
  const [files, setFiles] = useState([]);
  const [done, setDone] = useState(undefined);

  const simpanBarang = async (e) => {
    setDone(true);

    if (
      nama === null ||
      hargaBeli === null ||
      hargaJual === null ||
      stock === null ||
      files.length === 0
    ) {
      swal("Error", `Pastikan data telah diisi dengan sesuai!`, "error");
      setDone(undefined);
    } else {
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "stuffly");

      const res = await fetch(UPLOAD_IMAGE, {
        method: "post",
        body: data,
      });

      const file = await res.json();

      const config = {
        method: "post",
        url: CREATE_STUFF,
        data: {
          name: nama,
          image_url: file.secure_url,
          buying_price: hargaBeli,
          selling_price: hargaJual,
          stock: stock,
        },
      };

      axios(config)
        .then((res) => {
          swal({
            title: "Sukses",
            text: "Data barang berhasil disimpan!",
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
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const image = files.map((file) => (
    <>
      <div key={file.name}>
        <img
          type="button"
          src={file.preview}
          alt="preview image"
          className="img-upload"
        />
        <p className="pl-1 my-1">
          <strong>[{file.name}]</strong> *Ketuk dan tahan gambar untuk
          memperbesar.
        </p>
      </div>
    </>
  ));

  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Buat Barang
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
            <div class="modal-body px-4">
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
                        <p className="my-auto">Drop file here..</p>
                      </div>
                    ) : (
                      <div class="upload-image-input border border-secondary rounded">
                        <p className="my-auto">
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div>{image}</div>
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
                onClick={simpanBarang}
              >
                Save
              </button>
              {done && (
                <Lottie
                  animationData={Loading}
                  height={50}
                  width={50}
                  className="loading"
                />
              )}
              {!done && simpanBarang}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateBarang;
