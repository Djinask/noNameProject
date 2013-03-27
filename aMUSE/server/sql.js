/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 *
 * QUERIES**
 *
 *
 */



exports.query_data_limit="SELECT * FROM Object LIMIT 24";
exports.query_data="SELECT * FROM Object";
exports.query_select_section="SELECT * FROM Sections";
exports.query_select_exhibition="SELECT * FROM Exhibitions";
exports.query_select_autor="SELECT * FROM Autors";
exports.query_select_object="SELECT * FROM Objects WHERE id=?";
expors.query_insert_mail="INSERT INTO User(email,password) VALUES (?, ?)";