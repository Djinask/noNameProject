/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 *
 * QUERIES**
 *
 *
 */

exports.query_data="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition";
exports.query_select_sections="SELECT * FROM aMuseSection ORDER BY section_name";
exports.query_select_exhibitions="SELECT * FROM aMuseExhibition ORDER BY exhibition_name";
exports.query_select_authors="SELECT * FROM aMuseAuthor ORDER BY author_name";
exports.query_select_object="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseSection WHERE object_id = ?";

exports.query_insert_mail="INSERT INTO aMuseUser(user_email,user_password) VALUES (?, ?)";
//QUERY LIMIT

exports.query_select_objects="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition LIMIT ?, 24";


//FILTER
exports.query_select_object_by_author="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE author_id = ? LIMIT ?, 24";
exports.query_select_object_by_section="SELECT * FROM aMuseObject NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseAuthor WHERE section_id = ? LIMIT ?, 24";
exports.query_select_object_by_exhibition="SELECT * FROM aMuseObject NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseSection NATURAL JOIN aMuseAuthor WHERE exhibition_id = ? LIMIT ?, 24";


exports.query_search = "SELECT DISTINCT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE MATCH(author_name, exhibition_name, section_name, object_name, object_description, exhibition_description) AGAINST (?) LIMIT ?, 24";

//LOGIN

exports.query_login="SELECT * FROM aMuseUser WHERE user_email = ? AND user_password = ? ";
exports.query_get_user_data="SELECT * FROM aMuseUser WHERE user_id = ?";
exports.query_change_hash="UPDATE aMuseUser SET hash = ? WHERE user_id = ?";

// UPDATE USER DATA
exports.query_change_user_password="UPDATE aMuseUser SET user_password = ? WHERE user_id = ?";
exports.query_change_email="UDATE aMuseUser SET user_email = ? WHERE user_id = ?";

//INSERIMENTO PHOTO PERSONALI

exports.query_insert_photo="INSERT INTO aMusePersonalPhoto(user_id, personalphoto_comment, personalphoto_name) VALUES(?,?,?)";

//VISUALIZZAZIONE FOTO PERSONALI

exports.query_select_photos="SELECT * FROM aMusePersonalPhoto NATURAL JOIN aMuseObject NATURAL JOIN aMuseVisit WHERE user_id = ?";
exports.query_get_bookmarks="SELECT * FROM aMuseUserBookmark NATURAL JOIN aMuseObject NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseAuthor WHERE user_id = ?";

//ADD PHOTOBOOK

exports.query_photobook_add="INSERT INTO aMuseUserBookmark(user_id, object_id) VALUES(?,?)";

//REMOVING
//remove bookmark
exports.query_del_bookmark="DELETE * FROM aMuseUserBookmark WHERE user_id = ?  AND object_id = ?";
//remove aMusePersonalPhoto
exports.query_del_photo="DELETE * FROM aMusePersonalPhoto WHERE user_id = ? AND personalphoto_id = ?";

// ++++++++++++++++ ADMIN QUERY-SET +++++++++++++++++++

// GET QUERY
exports.query_get_exhibitions="SELECT * FROM aMuseExhibition";
exports.query_get_exhibition_by_id="SELECT * FROM aMuseExhibition WHERE exhibition_id = ?";
exports.query_get_users="SELECT * FROM aMuseUser";
exports.query_get_user_by_id="SELECT * FROM aMuseUser WHERE user_id = ?";
exports.query_get_sections="SELECT * FROM aMuseSection";
exports.query_get_section_by_id="SELECT section_name FROM aMuseSection WHERE section_id = ?";
/* USE QUERY GET DATA FOR GETTING OPERAS INFO */
exports.query_get_opera_by_id="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE object_id = ?";
exports.query_get_personal_photos="SELECT * FROM aMusePersonalPhoto";
exports.query_get_personal_photos_by_id="SELECT * FROM aMusePersonalPhoto WHERE personalphoto_id = ?";
exports.query_get_authors="SELECT * FROM aMuseAuthor";
exports.query_get_authors_by_id="SELECT author_name FROM aMuseAuthor WHERE author_id = ?";
exports.query_get_authors_in_alpha_order="SELECT * FROM aMuseAuthor ORDER BY author_name";

// ADD QUERY
exports.query_add_opera="INSERT INTO aMuseObject(object_name,exhibition_id,section_id,author_id,object_description) VALUES (?,?,?,?,?)";
exports.query_add_author="INSERT INTO aMuseAuthor(author_name) VALUES (?)";
exports.query_add_exhibition="INSERT INTO aMuseExhibition(exhibition_name,exhibition_begin,exhibition_end,exhibition_description) VALUES (?,?,?,?)";
exports.query_add_section="INSERT INTO aMuseSection(section_name) VALUES (?)";

// REMOVE QUERY
	// Ban aMuseUser
exports.query_remove_user="DELETE * FROM aMuseUser WHERE user_id = ?";
exports.query_remove_bookmarked="DELETE * FROM aMuseUserBookmark WHERE user_id = ?";
exports.query_remove_personal_photos="DELETE * FROM aMusePersonalPhoto WHERE user_id = ?";
	// Various removal
exports.query_remove_opera_by_id="DELETE FROM aMuseObject WHERE object_id = ?";
exports.query_remove_author_by_id="DELETE FROM aMuseAuthor WHERE author_id = ?";
exports.query_remove_section_by_id="DELETE FROM aMuseSection WHERE section_id = ?";
exports.query_remove_visit_by_id="DELETE FROM aMuseVisit WHERE visit_id = ?";
exports.query_remove_exhibition_by_id="DELETE FROM aMuseExhibition WHERE exhibition_id = ?";

// CHANGES QUERY
	// Exhibition
exports.query_reset_exhibition_name="UDATE aMuseExhibition SET exhibition_name = ? WHERE exhibition_id = ?";
exports.query_reset_exhibition_begin="UDATE aMuseExhibition SET exhibition_begin = ? WHERE exhibition_id = ?";
exports.query_reset_exhibition_end="UDATE aMuseExhibition SET exhibition_end = ? WHERE exhibition_id = ?";
exports.query_reset_exhibition_description="UDATE aMuseExhibition SET exhibition_description = ? WHERE exhibition_id = ?";
	// Opera
exports.query_reset_opera_name="UPDATE aMuseObject SET object_name = ? WHERE object_id = ?";
exports.query_reset_opera_author="UPDATE aMuseObject SET author_id = ? WHERE object_id = ?";
exports.query_reset_opera_exhibition="UPDATE aMuseObject SET exhibition_id = ? WHERE object_id = ?";
exports.query_reset_opera_section="UPDATE aMuseObject SET section_id = ? WHERE object_id = ?";
exports.query_reset_opera_description="UPDATE aMuseObject SET object_description = ? WHERE object_id = ?";
exports.query_reset_author_name="UPDATE aMuseAuthor SET author_name = ? WHERE author_id = ?";
	// aMuseSection
exports.query_reset_section_name="UPDATE aMuseSection SET section_name = ? WHERE section_id = ?";