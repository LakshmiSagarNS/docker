
const getdata = "SELECT * FROM datasets";
const getDataById = "SELECT * FROM datasets WHERE ID=$1";
const checkIdExists = "SELECT * FROM datasets  WHERE ID=$1";
const addData = "INSERT INTO datasets (id, dataset_id,type,name, validation_config, extraction_config, dedup_config, data_schema, denorm_config, router_config, dataset_config, tags, data_version, status, created_by, updated_by, created_date, updated_date, published_date) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)";
const removeData ="DELETE FROM datasets WHERE ID=$1";
const updateData ="UPDATE  datasets  SET dataset_id= $1,  type= $2,  name= $3,  validation_config= $4,  extraction_config= $5,  dedup_config= $6,  data_schema= $7,  denorm_config= $8,  router_config= $9,  dataset_config= $10,  tags= $11,  data_version= $12,  status= $13,  created_by= $14,  updated_by= $15,  created_date= $16,  updated_date= $17,  published_date= $18 WHERE id = $19";


module.exports = {
    getdata,
    getDataById,
    checkIdExists,
    addData,
    removeData,
    updateData,
    
};