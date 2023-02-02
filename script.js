const convertBtn = document.querySelector('#convertBtn');
const jpgFileInput = document.querySelector('#jpgFile');

convertBtn.addEventListener('click', function () {

    const jpgFile = jpgFileInput.files[0];
    if (!jpgFile) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Select an image first!',
            button: 'Ok',
            confirmButtonColor: '#0d45a5'
        })
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(jpgFile);
    reader.onload = function () {
        const jpgDataUrl = reader.result;

        // convert jpg to png using canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = jpgDataUrl;
        image.onload = function () {
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            const pngDataUrl = canvas.toDataURL('image/png');

            // download the png file
            const link = document.createElement('a');
            link.download = 'converted.png';
            link.href = pngDataUrl;
            link.click();
        };
    };
});