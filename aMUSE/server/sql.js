/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 *
 * QUERIES**
 *
 *
 */

exports.query_select_objects="SELECT * FROM Object LIMIT 24";
exports.query_data="SELECT * FROM Object";
exports.query_select_sections="SELECT * FROM Sections ORDER BY section_name";
exports.query_select_exhibitions="SELECT * FROM Exhibitions ORDER BY exhibition_name";
exports.query_select_authors="SELECT * FROM Autors ORDER BY author_name";
exports.query_select_object="SELECT * FROM Object WHERE object_id=?";

exports.query_select_object_by_author="SELECT * FROM Object join Autors WHERE id_autor=?";
exports.query_select_object_by_section="SELECT * FROM Object join Sections WHERE id_section=?";
exports.query_select_object_by_exhibition="SELECT * FROM Object join Exhibitions WHERE id_exhibition=?";

exports.query_insert_mail="INSERT INTO User(email,password) VALUES (?, ?)";

//exports.query_data_limit="SELECT * FROM Object LIMIT 24";
//exports.query_data="SELECT * FROM Object";
//exports.query_select_section="SELECT * FROM Sections";
//exports.query_select_exhibition="SELECT * FROM Exhibitions";
//exports.query_select_autor="SELECT * FROM Autors";
//exports.query_select_object="SELECT * FROM Objects WHERE id=?";

//exports.query_select_object_by_autor="SELECT * FROM Objects inner join Autors on Object.autor=Autors.id_autor WHERE autor_id=?";
//exports.query_select_object_by_section="SELECT * FROM Objects join Sections on Object.section=Sections.id_sectioninner WHERE Section_id=?";
//exports.query_select_object_by_autor="SELECT * FROM Objects join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE exhibitions_id=?";


exports.query_ricerca = "SELECT DISTINCT object_id, name FROM Object inner join Autors on Object.autor=Autors.id_autor inner join Sections on Object.section=Sections.id_sectioninner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE autor_name LIKE ? or section_name like ? or exhibition_name like ? or name = ? or description = ?";