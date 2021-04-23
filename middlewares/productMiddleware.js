const { check, body} = require('express-validator');
const moment = require("moment");
const path = require("path");

module.exports = [
    check('name').isLength({min: 5, max:50}).withMessage("El nombre del producto debe tener minimo 10 caracteres y maximo 50"),
    check('supplier_id').notEmpty().withMessage("El producto debe tener asignado un proveedor"),
    check('price').isDecimal().withMessage("El precio del producto debe ser numerico"),
    check('discount').isDecimal({gt:0, lt:100}).withMessage("El descuento del producto debe ser mayor o igual a 0 y menor que 100"),
    check('category_id').notEmpty().withMessage("El producto debe tener asociada una categoria"),
    check('life_date_from').isDate().withMessage("El producto debe tener asignada una fecha de vigencia desde"),
    check('life_date_to').isDate().withMessage("El producto debe tener asignada una fecha de vigencia hasta"),
    check('expiration_days').isInt({gt: 0}).withMessage("Los dias de vencimiento del producto debe mayor o igual a 0"),
    check('share').isLength({min: 10, max:30}).withMessage("El campo compartir del producto debe tener minimo 10 caracteres y maximo 30"),
    check('stock').isInt({gt: 0}).withMessage("La disponibilidad del producto debe ser mayor o igual a 0"),
    check('status').notEmpty().withMessage("El estado del producto debe tener asociado un valor"),
    check('description').isLength({min: 20, max:300}).withMessage("La descripcion del producto debe tener minimo 10 caracteres y maximo 300"),
    body('life_date_from').custom(function(value,{req}){
        fecha_actual = new Date
        fecha_actual = moment(fecha_actual).format('YYYY-MM-DD')
        if (value < fecha_actual && !req.originalUrl.includes("editar")) {
            throw new Error('El producto debe tener asignada una fecha de vigencia desde mayor a hoy');
        }
        return true;
    }),
    body('life_date_to').custom(function(value,{req}){

        if (value < req.body.life_date_from) {
            throw new Error('El producto debe tener asignada una fecha de vigencia hasta mayor a la desde');
        }
        return true;
    }),
    check('image').custom((value,{req}) => {
        if ((req.files.length <= 0 || req.files.length > 5) && !req.originalUrl.includes("editar")) {
            throw new Error('Debe ingresar como minimo una imagen y como maximo 5');
        }
        return true; 
    }),
    body("image")
      .custom((value, { req }) => {
        if (req.files != undefined) {
          const acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif"];

          for (let i = 0; i < req.files.length; i++) {
            const ext = path.extname(req.files[i].originalname);

            if (!acceptedExtensions.includes(ext)) {
                throw new Error (
                    "La imagen debe tener uno de los siguientes formatos: JPG, JPEG, PNG, GIF"
                )
            }
          }
        }

        return true;
      })

]