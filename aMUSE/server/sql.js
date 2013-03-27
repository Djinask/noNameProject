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

exports.query_select_object_by_autor="SELECT * FROM Objects inner join Autors on Object.autor=Autors.id_autor WHERE autor_id=?";
exports.query_select_object_by_section="SELECT * FROM Objects join Sections on Object.section=Sections.id_sectioninner WHERE Section_id=?";
exports.query_select_object_by_autor="SELECT * FROM Objects join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE exhibitions_id=?";


exports.query_ricerca = "SELECT DISTINCT object_id, name FROM Object inner join Autors on Object.autor=Autors.id_autor inner join Sections on Object.section=Sections.id_sectioninner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE autor_name LIKE ? or section_name like ? or exhibition_name like ? or name = ? or description = ?";








expors.query_insert_mail="INSERT INTO User(email,password) VALUES (?, ?)";