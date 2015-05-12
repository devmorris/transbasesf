<?php

function pg_array_parse( $text, &$output, $limit = false, $offset = 1 )
{
  if( false === $limit )
  {
    $limit = strlen( $text )-1;
    $output = array();
  }
  if( '{}' != $text )
    do
    {
      if( '{' != $text{$offset} )
      {
        preg_match( "/(\\{?\"([^\"\\\\]|\\\\.)*\"|[^,{}]+)+([,}]+)/", $text, $match, 0, $offset );
        $offset += strlen( $match[0] );
        $output[] = ( '"' != $match[1]{0} ? $match[1] : stripcslashes( substr( $match[1], 1, -1 ) ) );
        if( '},' == $match[3] ) return $offset;
      }
      else  $offset = pg_array_parse( $text, $output[], $limit, $offset+1 );
    }
    while( $limit > $offset );
  return $output;
}

// attempt a connection
$a = $_POST['meta_id'];

$conn = pg_connect("host=54.193.77.45 port=5432 dbname=transbase_public user=opendata password=opendata");
if (!$conn) {
  echo "An error occurred.\n";
  exit;
}
$result = pg_query($conn, 'SELECT meta_id, field_name, original_agency, original_field_name, original_data_source, 
       data_date, data_description, use_limitation, on_datasf, point_of_contact, 
       date_transbase_add, date_transbase_update, update_schedule, documentation, 
       comments, web_title, table_name, data_key, tags
  FROM tbl_metadata WHERE meta_id = '.$a);


$test = pg_query($conn, 'SELECT data_key FROM tbl_metadata WHERE meta_id = '.$a);

$row = pg_fetch_row($result);
$field_name = $row[1];
$original_agency = $row[2];
$original_field_name = $row[3]; 
$original_data_source = $row[4];
$data_date = $row[5];
$data_description = $row[6];
$use_limitation = $row[7];
$on_datasf = $row[8];
$point_of_contact = $row[9];
$data_transbase_add = $row[10];
$date_transbase_update = $row[11];
$update_schedule = $row[12];
$documentation = $row[13];
$comments = $row[14];
$web_title = $row[15];
$table_name = $row[16];
$tags = $row[18];

$testrow = pg_fetch_row($test);
$data_key = pg_array_parse($testrow[0]);
?>


<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office'
xmlns:x='urn:schemas-microsoft-com:office:excel'
xmlns='http://www.w3.org/TR/REC-html40'>

<head>
<meta http-equiv=Content-Type content='text/html; charset=windows-1252'>
<meta name=ProgId content=Excel.Sheet>
<meta name=Generator content='Microsoft Excel 14'>
<link rel=File-List href='meta1_files/filelist.xml'>
<style id='meta_19276_Styles'>
<!--table
	{mso-displayed-decimal-separator:'\.';
	mso-displayed-thousand-separator:'\,';}
.xl9219276
	{padding-top:1px;
	padding-right:1px;
	padding-left:3px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	background:#D9D9D9;
	mso-pattern:black none;
	white-space:normal;}
.xl9319276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	background:#D9D9D9;
	mso-pattern:black none;
	white-space:normal;}
.xl9419276
	{padding-top:3px;
	padding-right:1px;
	padding-left:3px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:normal;}
.xl9519276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:windowtext;
	font-size:8.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:normal;}
.xl9619276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	background:#D9D9D9;
	mso-pattern:black none;
	white-space:normal;}
.xl9719276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:normal;}
.xl9819276
	{padding-top:1px;
	padding-right:1px;
	padding-left:3px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:'\[ENG\]\[$-409\]mmmm\\-yyyy\;\@';
	text-align:left;
	vertical-align:middle;
	background:#D9D9D9;
	mso-pattern:black none;
	white-space:normal;}
.xl9919276
	{padding-top:1px;
	padding-right:1px;
	padding-left:3px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:'\[ENG\]\[$-409\]mmmm\\-yyyy\;\@';
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:normal;}
.xl10019276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:normal;}
.xl10119276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:11.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:nowrap;}
.xl10219276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:white;
	font-size:8.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:center;
	vertical-align:middle;
	background:#16365C;
	mso-pattern:black none;
	white-space:nowrap;}
.xl10319276
	{padding-top:1px;
	padding-right:1px;
	padding-left:3px;
	mso-ignore:padding;
	color:windowtext;
	font-size:8.0pt;
	font-weight:700;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:nowrap;}
.xl10419276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:windowtext;
	font-size:8.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:General;
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:nowrap;}
.xl10519276
	{padding-top:1px;
	padding-right:1px;
	padding-left:1px;
	mso-ignore:padding;
	color:black;
	font-size:8.0pt;
	font-weight:400;
	font-style:normal;
	text-decoration:none;
	font-family:Calibri, sans-serif;
	mso-font-charset:0;
	mso-number-format:'\[ENG\]\[$-409\]mmmm\\-yyyy\;\@';
	text-align:left;
	vertical-align:middle;
	mso-background-source:auto;
	mso-pattern:auto;
	white-space:normal;}
	table{
    table-layout: fixed;
}
	td{
    word-wrap:break-word
}
-->
</style>
</head>
<?php if (!$result) {
  echo "<br><body><strong><FONT FACE='Calibri'><font size='2'><center>Please select a sublayer under this heading.</center></font></strong></body>\n";
  exit;
}?>
<body>
<!--[if !excel]>&nbsp;&nbsp;<![endif]-->
<!--The following information was generated by Microsoft Excel's Publish as Web
Page wizard.-->
<!--If the same item is republished from Excel, all information between the DIV
tags will be replaced.-->
<!----------------------------->
<!--START OF OUTPUT FROM EXCEL PUBLISH AS WEB PAGE WIZARD -->
<!----------------------------->

<div id='meta_19276' align=center x:publishsource='Excel'>

<table border=0 cellpadding=0 cellspacing=0 width=270 style='border-collapse:
 collapse;table-layout:fixed;width:100%;margin:0;padding:0;'>
 <col class=xl10119276 width=120 style='mso-width-source:userset;mso-width-alt:
 4388;width:90pt'>
 <col class=xl10019276 width=150 style='mso-width-source:userset;mso-width-alt:
 5485;width:113pt'>
 <tr class=xl6553519276 height=20 style='height:15.0pt'>
  <td colspan=2 height=20 class=xl10219276 width=270 style='height:15.0pt;
  width:203pt'><?php echo $web_title;?></td>
 </tr>
 <tr class=xl6553519276 height=20 style='height:15.0pt'>
  <td height=20 class=xl10319276 style='height:15.0pt'>Table</td>
  <td class=xl10419276><?php echo $table_name;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9219276 width=120 style='height:15.0pt;width:90pt'>Field
  Name</td>
  <td class=xl9319276 width=150 style='width:113pt'><?php echo $field_name;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9419276 width=120 style='height:15.0pt;width:90pt'>Original
  Source</td>
  <td class=xl9519276 width=150 style='width:113pt'><?php echo $original_agency;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9219276 width=120 style='height:15.0pt;width:90pt'>Original
  Field Name</td>
  <td class=xl9619276 width=150 style='width:113pt'><?php echo $original_field_name;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9419276 width=120 style='height:15.0pt;width:90pt'>Original
  Data Source</td>
  <td class=xl9719276 width=150 style='width:113pt'><?php echo $original_data_source;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9819276 width=120 style='height:15.0pt;width:90pt'>Data
  Date</td>
  <td class=xl9619276 width=150 style='width:113pt'><?php echo $data_date;?></td>
 </tr>
 <tr height=30 style='height:22.5pt'>
  <td height=30 class=xl9419276 width=120 style='height:22.5pt;width:90pt'>Data
  Description</td>
  <td class=xl9719276 width=150 style='width:113pt'><?php echo $data_description;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9219276 width=120 style='height:15.0pt;width:90pt'>Use
  Limitations</td>
  <td class=xl9619276 width=150 style='width:113pt'><?php echo $use_limitation;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9419276 width=120 style='height:15.0pt;width:90pt'>On
  DataSF</td>
  <td class=xl9719276 width=150 style='width:113pt'><?php if ($on_datasf != 'No') {echo "<a href='$on_datasf' target='_blank'>$on_datasf</a>";} else echo $on_datasf;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9219276 width=120 style='height:15.0pt;width:90pt'>Tags</td>
  <td class=xl9619276 width=150 style='width:113pt'><?php echo $tags;?></td>
 </tr>
 <tr height=30 style='height:22.5pt'>
  <td height=30 class=xl9919276 width=120 style='height:22.5pt;width:90pt'>Date
  Added to Transbase</td>
  <td class=xl10519276 width=150 style='width:113pt'><?php echo $data_transbase_add;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9219276 width=120 style='height:15.0pt;width:90pt'>Update
  Schedule</td>
  <td class=xl9619276 width=150 style='width:113pt'><?php echo $update_schedule;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9419276 width=120 style='height:15.0pt;width:90pt'>Comments</td>
  <td class=xl10519276 width=150 style='width:113pt'><?php if (strpos($comments,'http://') !== false) {echo "<a href='$comments' target='_blank'>$comments</a>";} else echo $comments;?></td>
 </tr>
 <tr height=20 style='height:15.0pt'>
  <td height=20 class=xl9219276 width=120 style='height:15.0pt;width:90pt'>Data Key</td>
 <td class=xl9619276 width=150 style='width:113pt'><b>Value - Description</b><br><?php $arrlength=count($data_key);
	for($x=0;$x<$arrlength;$x++)
	{
		echo $data_key[$x];
		echo "<br>";
	};?></td>
 </tr>
 <![if supportMisalignedColumns]>
 <tr height=0 style='display:none'>
  <td width=120 style='width:90pt'></td>
  <td width=150 style='width:113pt'></td>
 </tr>
 <![endif]>
</table>

</div>


<!----------------------------->
<!--END OF OUTPUT FROM EXCEL PUBLISH AS WEB PAGE WIZARD-->
<!----------------------------->
</body>

</html>
