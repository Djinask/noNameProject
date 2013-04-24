/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 *
 * QUERIES**
 *
 *
 */

exports.query_data="SELECT * FROM Object";
exports.query_select_sections="SELECT * FROM Sections ORDER BY section_name";
exports.query_select_exhibitions="SELECT * FROM Exhibitions ORDER BY exhibition_name";
exports.query_select_authors="SELECT * FROM Autors ORDER BY autor_name";
exports.query_select_object="SELECT * FROM Object JOIN Autors ON autor = id_autor JOIN Exhibitions ON exhibition = id_exhibition JOIN Sections ON section = id_section WHERE object_id=?";


exports.query_insert_mail="INSERT INTO User(email,password) VALUES (?, ?)";
//QUERY LIMIT

exports.query_select_objects="SELECT * FROM Object LIMIT ?, 24";


//FILTER
exports.query_select_object_by_author="SELECT * FROM Object inner join Autors on Object.autor=Autors.id_autor WHERE id_autor=? LIMIT ?, 24";
exports.query_select_object_by_section="SELECT * FROM Object inner join Sections on Object.section=Sections.id_section WHERE id_section=? LIMIT ?, 24";
exports.query_select_object_by_exhibition="SELECT * FROM Object inner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE id_exhibition=? LIMIT ?, 24";


exports.query_search = "SELECT DISTINCT object_id, name FROM Object INNER JOIN Autors ON Object.autor=Autors.id_autor INNER JOIN Sections ON Object.section=Sections.id_section inner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE autor_name LIKE ? or section_name LIKE ? or exhibition_name LIKE ? or name LIKE ? LIMIT ?, 24";

//LOGIN

exports.query_login="SELECT * FROM User WHERE email = ? AND password = ? ";
exports.query_get_user_data="SELECT * FROM User WHERE user_id = ?";
exports.query_change_hash="UPDATE User SET hash = ? WHERE user_id = ?";
exports.query_get_user="SELECT * FROM User WHERE user_id = ?";

// UPDATE USER DATA
exports.query_change_password="UPDATE User SET password = ? WHERE user_id = ?";
exports.query_change_email="UDATE User SET email = ? WHERE user_id = ?";

//INSERIMENTO PHOTO PERSONALI

exports.query_insert_photo="INSERT INTO PersonalPhoto(user_id, comment, title) VALUES(?,?,?)";

//VISUALIZZAZIONE FOTO PERSONALI

exports.query_select_photos="SELECT * FROM PersonalPhoto WHERE user_id=?";
exports.query_get_bookmarks="SELECT * FROM UserBookmark NATURAL JOIN Object JOIN Exhibitions ON exhibition = id_exhibition JOIN Autors ON autor = id_autor WHERE user_id = ?";

//ADD PHOTOBOOK

exports.query_photobook_add="INSERT INTO UserBookmark(user_id, object_id) VALUES(?,?)";

//REMOVING
//remove bookmark
exports.query_del_bookmark="DELETE FROM UserBookmark WHERE user_id = ?  AND object_id=?";
//remove PersonalPhoto
exports.query_del_photo="DELETE FROM PersonalPhoto WHERE user_id = ? AND personal_photo_id=?";
