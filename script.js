var dataStore = [];

function tambahData() {
  var namaBarangInput = document.getElementById("namaBarang");
  var beratInput = document.getElementById("berat");
  var gambarInput = document.getElementById("gambar");
  var barangBody = document.getElementById("barangBody");

  var namaBarang = namaBarangInput.value;
  var berat = parseFloat(beratInput.value);
  var gambar = gambarInput.value;

  if (berat > 5) {
    var backgroundColorClass = "highlight";
  } 

  var newRow = barangBody.insertRow();
  var cellNo = newRow.insertCell(0);
  var cellNamaBarang = newRow.insertCell(1);
  var cellBerat = newRow.insertCell(2);
  var cellGambar = newRow.insertCell(3);
  var cellAksi = newRow.insertCell(4);

  var data = {
    namaBarang: namaBarang,
    berat: berat,
    gambar: gambar
  };

  dataStore.push(data);

  cellNo.textContent = dataStore.length;
  cellNamaBarang.textContent = data.namaBarang;
  cellBerat.textContent = data.berat + " kg";
  cellBerat.classList.add(backgroundColorClass);
  cellGambar.innerHTML = '<img src="' + data.gambar + '" alt="' + data.namaBarang + '" style="max-width: 100px;">';

  var btnEdit = document.createElement("button");
  btnEdit.textContent = "Edit";
  btnEdit.onclick = function() {
    editBaris(newRow, data);
  };
  cellAksi.appendChild(btnEdit);

  var btnHapus = document.createElement("button");
  btnHapus.textContent = "Hapus";
  btnHapus.onclick = function() {
    hapusBaris(newRow);
  };
  cellAksi.appendChild(btnHapus);

  namaBarangInput.value = "";
  beratInput.value = "";
  gambarInput.value = "";
}

function editBaris(row, data) {
  var cells = row.cells;

  // Simpan nilai awal sebelum diubah
  var originalValues = {
    namaBarang: data.namaBarang,
    berat: data.berat,
    gambar: data.gambar
  };

  // Ubah sel menjadi input untuk diedit
  cells[1].innerHTML = '<input type="text" id="editNamaBarang" value="' + originalValues.namaBarang + '">';
  cells[2].innerHTML = '<input type="number" id="editBerat" value="' + parseFloat(originalValues.berat) + '">';
  cells[3].innerHTML = '<input type="text" id="editGambar" value="' + originalValues.gambar + '">';

  // Ganti tombol Edit menjadi Save
  cells[4].innerHTML = '<button onclick="saveBaris(this.parentNode.parentNode, ' + dataStore.indexOf(data) + ')">Save</button>';

  // Hapus tombol hapus
  cells[4].removeChild(cells[4].getElementsByTagName('button')[1]);
}

function saveBaris(row, dataIndex) {
  var cells = row.cells;

  // Ambil nilai yang diedit
  var editedValues = {
    namaBarang: document.getElementById("editNamaBarang").value,
    berat: parseFloat(document.getElementById("editBerat").value),
    gambar: document.getElementById("editGambar").value,
  };

  // Perbarui data di array
  dataStore[dataIndex] = editedValues;

  // Kembalikan sel menjadi text
  cells[1].textContent = editedValues.namaBarang;
  cells[2].textContent = editedValues.berat + " kg";
  cells[3].innerHTML = '<img src="' + editedValues.gambar + '" alt="' + editedValues.namaBarang + '" style="max-width: 100px;">';

  // Ganti tombol Save menjadi Edit
  cells[4].innerHTML = '<button onclick="editBaris(this.parentNode.parentNode, ' + dataIndex + ')">Edit</button>';

  // Tambahkan tombol hapus
  var btnHapus = document.createElement("button");
  btnHapus.textContent = "Hapus";
  btnHapus.onclick = function() {
    hapusBaris(row);
  };
  cells[4].appendChild(btnHapus);
}

function hapusBaris(row) {
  var barangBody = document.getElementById("barangBody");
  var dataIndex = Array.from(barangBody.rows).indexOf(row);
  
  // Hapus data dari array
  dataStore.splice(dataIndex, 1);

  barangBody.removeChild(row);

  // Perbarui nomor pada kolom "No"
  for (var i = 0; i < barangBody.rows.length; i++) {
    barangBody.rows[i].cells[0].textContent = i + 1;
  }
}