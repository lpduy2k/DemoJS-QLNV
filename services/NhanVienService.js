var NhanVienService = function () {

    this.layDanhSachNhanVien = function () {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
            method: 'GET' 
        })
        return promise; 
    }
    this.themNhanVien = function(nv) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien', 
            method: 'POST', 
            data: nv 
        })
        return promise;
    }

    this.xoaNhanVien = function (maNhanVien) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNhanVien,
            method: 'DELETE'
        })
        return promise;
    }

    this.suaNhanVien = function (maNhanVien) {
        var promise = axios({
            url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVien,
            method: 'GET'
        })
        return promise;
    }
    this.capNhatNhanVien = function (maNhanVien,nvCapNhat) {
        var promise = axios({
            url:'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien='+ maNhanVien,
            method:'PUT',
            data: nvCapNhat 
        })
        return promise;
    }

}