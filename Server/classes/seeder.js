// "const WilayaModel = require("../models/wilayaModel");
// const CommuneModel = require("../models/communeModel");

// const { Wilaya } = require("../../mock/buncha");
// const { Commune } = require("../../mock/buncha");
// const userModel = require("../models/userModel");
// const User = require("./user");


// class Seeder {
//   static async wilaya() {
//     //rechercher une wilaya dans la bdd
//     const wl_exist = await WilayaModel.findOne();
//     if (!wl_exist) {
//       const wilayaDocuments = Wilaya.map((w, index) => ({
//         name: w,
//         code: index + 1,
//         tarifs: [
//           {
//             etat: "livré",
//             price: 400,
//           },
//           {
//             etat: "retours",
//             price: 100,
//           },
//         ],
//       }));
//       await WilayaModel.insertMany(wilayaDocuments);
//     } else {
//       console.log("Wilaya documents already exist");
//     }

//     // Accessing the price property
//     const wilaya = await WilayaModel.findOne({ code: 1 });
//     if (wilaya && wilaya.tarifs && wilaya.tarifs.length > 0) {
//       console.log(wilaya.tarifs[0].price);
//     } else {
//       console.log("Tarifs not defined or empty for wilaya code 1");
//     }
//   }

//   static async commune() {
//     // Rechercher une commune dans la bdd

//     const cm_exist = await CommuneModel.findOne();
//     if (!cm_exist) {
//       let com = [];
//       for (const c of Commune) {
//         const code_w = parseInt(c.wilaya_code.replace("0", ""));
//         const w = await WilayaModel.findOne({ code: code_w });

//         com.push({
//           name: c.commune_name_ascii,
//           postcode: c.wilaya_code,
//           wilaya: w._id,
//         });
//       }
//       await CommuneModel.insertMany(com);
//     }
//   }

//   static async etat() {
//     //Rechercher un etat dans la bdd

//     const et_exist = await EtatModel.findOne();
//     if (!et_exist) {
//       const etatDocuments = Etat.map(({ name, code, _id }) => ({
//         _id,
//         name,
//         code,
//       }));
//       await EtatModel.insertMany(etatDocuments);
//     }
//   }

//   static async sousetat() {
//     //Rechercher un sous etat dans la bdd

//     const setat_exist = await SousetatModel.findOne();
//     if (!setat_exist) {
//       let seta = [];
//       for (const se of SousEtat) {
//         const e = await EtatModel.findOne({ name: se.etat });
//         seta.push({
//           name: se.name,
//           etat: e._id,
//         });
//       }

//       await SousetatModel.insertMany(seta);
//     }
//   }

//   static async superAdmin() {
//     //Le superadmin

//     const roleSuperAdminValues = {
//       name: process.env.ROLE_SUPER_ADMIN_NAME,
//       envois: true,
//       clients: true,
//       livreurs: true,
//       paiements: true,
//       tarifs: true,
//       parameters: true,
//       administrateurs: true,
//     };

//     try {
//       let roleSuperAdmin = await Role.findByName(
//         process.env.ROLE_SUPER_ADMIN_NAME
//       );

//       if (!process.env.ROLE_SUPER_ADMIN_NAME) return;

//       if (!roleSuperAdmin) {
//         roleSuperAdmin = await Role.create(roleSuperAdminValues);
//         await Admin.deleteManyByEmail(process.env.SUPER_ADMIN_EMAIL);
//       }

//       if (!process.env.SUPER_ADMIN_EMAIL || !process.env.SUPER_ADMIN_PASSWORD)
//         return;

//       const superAdmin = await Admin.findByEmail(process.env.SUPER_ADMIN_EMAIL);
//       if (!superAdmin && roleSuperAdmin) {
//         const newSuperAdmin = {
//           email: process.env.SUPER_ADMIN_EMAIL,
//           password: process.env.SUPER_ADMIN_PASSWORD,
//           firstname: "Super",
//           lastname: "Admin",
//           phonenumber: "0770880535",
//           role: roleSuperAdmin?._id,
//         };
//         await Admin.create(newSuperAdmin);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }
// }

// module.exports = Seeder;
// "