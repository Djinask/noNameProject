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

exports.query_select_object_by_autor="SELECT * FROM Objects join Autors WHERE autor_id=?";
exports.query_select_object_by_section="SELECT * FROM Objects join Sections WHERE Section_id=?";
exports.query_select_object_by_autor="SELECT * FROM Objects join Exhibitions WHERE exhibitions_id=?";











expors.query_insert_mail="INSERT INTO User(email,password) VALUES (?, ?)";