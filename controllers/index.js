var validate = new Validation ();
var nvService = new NhanVienService();

var layDanhSachNhanVien = function () {
    var promise = nvService.layDanhSachNhanVien();
    promise.then(function (result) {
        console.log(result.data);
        renderTable(result.data);
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    });
}

var renderTable = function (arrNV) {
    var contentTable = '';
    for (var index = 0; index < arrNV.length; index++) {
        var nv = new NhanVien();
        nv.maNhanVien = arrNV[index].maNhanVien;
        nv.tenNhanVien = arrNV[index].tenNhanVien;
        nv.chucVu = arrNV[index].chucVu;
        nv.heSoChucVu = arrNV[index].heSoChucVu;
        nv.luongCoBan = arrNV[index].luongCoBan;
        nv.soGioLamTrongThang = arrNV[index].soGioLamTrongThang;
        contentTable += `
                        <tr>
                            <td>${nv.maNhanVien}</td>
                            <td>${nv.tenNhanVien}</td>
                            <td>${nv.chucVu}</td>
                            <td>${nv.luongCoBan}</td>
                            <td>${nv.tongLuong ()}</td>
                            <td>${nv.soGioLamTrongThang}</td>
                            <td>${nv.xepLoai ()}</td>                                                       
                            <td><button class="btn btn-danger" onclick ="deleteRow('${nv.maNhanVien}')">Xóa</button></td>
                            <td><button class="btn btn-primary" onclick ="editRow('${nv.maNhanVien}')">Chỉnh sửa</button></td>
                        </tr>
        `;
    }
    document.querySelector('#tbody').innerHTML = contentTable;
}

layDanhSachNhanVien();

var themNhanVien = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nhanVien.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;
    
    var valid = true;
    valid &= validate.ktr(nhanVien.maNhanVien, "Mã nhân viên", ".ktr-maNhanVien")
    & validate.ktr(nhanVien.tenNhanVien, "Tên nhân viên", ".ktr-tenNhanVien")
    & validate.ktr(nhanVien.luongCoBan, "Lương cơ bản", ".ktr-luongCoBan")
    & validate.ktr(nhanVien.soGioLamTrongThang, "Số giờ làm trong tháng", ".ktr-soGioLamTrongThang");

    valid &= validate.ktl(nhanVien.maNhanVien, "Mã nhân viên", ".ktl-maNhanVien", 4, 6)
    & validate.ktl(nhanVien.tenNhanVien, "Tên nhân viên", ".ktl-tenNhanVien", 2, 50);

    valid &= validate.ktv(nhanVien.luongCoBan, "Lương cơ bản", ".ktv-luongCoBan", 1000000, 20000000)
    & validate.ktv(nhanVien.soGioLamTrongThang, "Số giờ làm trong tháng", ".ktv-soGioLamTrongThang", 50, 150);

    valid &= validate.kts(nhanVien.tenNhanVien, "Tên nhân viên", ".kts-tenNhanVien");

    valid &= validate.kti(nhanVien.luongCoBan, "Lương cơ bản", ".kti-luongCoBan")
    & validate.kti(nhanVien.soGioLamTrongThang, "Số giờ làm trong tháng", ".kti-soGioLamTrongThang");

    if (!valid) {
        return; 
    }

    var promise = nvService.themNhanVien(nhanVien);
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVien();
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}

var luuThongTin = function () {
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector('#maNhanVien').value;
    nhanVien.tenNhanVien = document.querySelector('#tenNhanVien').value;
    var tagChucVu = document.querySelector('#chucVu');
    var arrOption = tagChucVu.options;
    nhanVien.chucVu = arrOption[tagChucVu.selectedIndex].innerHTML;
    nhanVien.heSoChucVu = document.querySelector('#chucVu').value;
    nhanVien.luongCoBan = document.querySelector('#luongCoBan').value;
    nhanVien.soGioLamTrongThang = document.querySelector('#soGioLamTrongThang').value;

    var promise = nvService.capNhatNhanVien(nhanVien.maNhanVien, nhanVien);
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVien();
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    })
}

var deleteRow = function (maNV) {
    var promise = nvService.xoaNhanVien(maNV);
    promise.then(function (result) {
        console.log(result.data);
        layDanhSachNhanVien();
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    });
}

var editRow = function (maNV) {
    var promise = nvService.suaNhanVien(maNV);
    promise.then(function (result) {
        var nhanVien = result.data;
        document.querySelector('#maNhanVien').value = nhanVien.maNhanVien;
        document.querySelector('#tenNhanVien').value = nhanVien.tenNhanVien;
        var tagChucVu = document.querySelector('#chucVu');
        var arrOption = tagChucVu.options;
        arrOption[tagChucVu.selectedIndex].innerHTML = nhanVien.chucVu;
        document.querySelector('#luongCoBan').value = nhanVien.luongCoBan;
        document.querySelector('#soGioLamTrongThang').value = nhanVien.soGioLamTrongThang;    
    });
    promise.catch(function (error) {
        console.log(error.response.data);
    });
}





    



