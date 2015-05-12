<!-- DataTables CSS -->
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.2/css/jquery.dataTables.css">
  
<!-- jQuery -->
<script type="text/javascript" charset="utf8" src="//code.jquery.com/jquery-1.10.2.min.js"></script>
  
<!-- DataTables -->
<script type="text/javascript" charset="utf8" src="//cdn.datatables.net/1.10.2/js/jquery.dataTables.js"></script>

<!--jQuery--->
<script>
$(document).ready( function () {
    $('#table_id').DataTable();
} );
$("#table_id").width($(window).width());

</script>
<STYLE TYPE="text/css">
<!--
th{font-family: tahoma,arial,verdana,sans-serif; font-size: 10px; font-weight:bold;}
td{font-family: tahoma,arial,verdana,sans-serif; font-size: 10px;}
body{font-family: tahoma,arial,verdana,sans-serif; font-size: 12px;}
table.dataTable.display tbody td {border-left: 1px solid #dddddd; border-right: 1px solid #dddddd;}
#title-image {
		border-bottom: solid 1px;
	}
td{
  word-wrap:break-word
-->
</STYLE>

	<link rel="icon" type="image/ico" href="../logo/pedestrian.png"/>
	<div id="title-image">
		<img src="../logo/transbase_logo.png" alt="TransBase">
	</div>
	<head>
		<title>TransBASE Metadata Browser</title>
	</head>
	<br>

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

$link = pg_connect("host=54.193.77.45 port=5432 dbname=transbase_public user=opendata password=opendata");
if (!$link)
{
	die('Error: Could not connect: ' . pg_last_error());
}


$query = "SELECT table_name, web_title, field_name, original_agency, original_field_name, original_data_source, 
       data_date, data_description, use_limitation, array_to_string(data_key,'<br>') as data_key, 
       date_transbase_add, date_transbase_update, update_schedule, 
       comments, tags, on_datasf
  FROM tbl_metadata";

$result = pg_query($query);

$i = 0;
echo '<html><body><table id="table_id" class="display" ><thead><tr>';
while ($i < pg_num_fields($result))
{  
	$fieldName = pg_field_name($result, $i);
	switch ($fieldName) {
    case "table_name":
        $fieldName = 'Table Name';
        break;
    case "field_name":
         $fieldName = 'Field Name';
        break;
    case "original_agency":
         $fieldName = 'Original Agency';
        break;
    case "original_field_name":
         $fieldName = 'Original Field Name';
        break;
    case "original_data_source":
         $fieldName = 'Original Data Source';
        break;
    case "data_date":
         $fieldName = 'Data Creation Date';
        break;
    case "data_description":
         $fieldName = 'Data Description';
        break;
    case "use_limitation":
         $fieldName = 'Use Limitation';
        break;		
    case "on_datasf":
         $fieldName = 'DataSF Link';
        break;		
    case "date_transbase_add":
         $fieldName = 'Date Data Added to TransBASE';
        break;
    case "date_transbase_update":
         $fieldName = 'Date Last Updated in TransBASE';
        break;		
    case "update_schedule":
         $fieldName = 'Update Schedule';
        break;
    case "comments":
         $fieldName = 'Comments';
        break;
    case "web_title":
         $fieldName = 'Web Portal Title';
        break;	
    case "tags":
         $fieldName = 'Tags';
        break;
    case "data_key":
         $fieldName = 'Data Key';
        break;			
	}
	echo '<th>' . $fieldName . '</th>';
	$i = $i + 1;
}
echo '</tr></thead><tbody>';
$i = 0;

while ($row = pg_fetch_row($result)) 
{
	echo '<tr>';
	$count = count($row);
	$y = 0;
	while ($y < $count)
	{
		$c_row = current($row);
		echo '<td>' . $c_row . '</td>';
		next($row);
		$y = $y + 1;
	}
	echo '</tr>';
	$i = $i + 1;
}
pg_free_result($result);

echo '</tbody></table></body></html>';
?>