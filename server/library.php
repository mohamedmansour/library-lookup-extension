<?php
/* Montreal Open Data Hackathon (Nov 2011) */

/* Get the URL variable for the ISBN */
$isbn = htmlspecialchars($_GET['isbn']);

/* Find out how long the ISBN was */
$isbn_length = strlen($isbn);

/* If the ISBN is not 10 or 13 characters then skip */
if ($isbn_length == 10 or $isbn_length == 13)
{	
	$first_two_numbers=substr($isbn ,0 ,2);
	
	/* Construct the file path we want to look in */
	/* we have split the data into files based on ISBN length and ISBN prefix */
	if ($isbn_length == 10)
	{
		$data_directory = "data/" . $first_two_numbers . "/10.txt";
	}
	else
	{
		$data_directory = "data/" . $first_two_numbers . "/13.txt";
	}
	
	/* LAZY : http://stackoverflow.com/questions/3686177/php-to-search-within-txt-file-and-echo-the-whole-line */
	/* Chose the approach that mentioned ALL matches and NOT CRASHING on big files, plus seems like we could exit early, if needed */
	
	$matches = array();

	$handle = @fopen($data_directory, "r");
	if ($handle)
	{
		while (!feof($handle))
		{
			$buffer = fgets($handle);
			if(strpos($buffer, $isbn) !== FALSE)
			{
				$matches[] = $buffer;
			}
		}
		fclose($handle);
	}
	
	header('Content-type: application/json');

	echo "[";

	$firstloop = TRUE;
	foreach ($matches as $value) 
	{
		if (! $firstloop)
		{		
			echo",";
		}
		
		echo "{";
		list($number, $state, $district) = split(Chr(9), $value);
		
		echo "\"status\":";

		if ($state == "Disponible")
		{
			echo "true";
		}
		else
		{
			echo "false";
		}
	    echo ",";
		
		echo "\"district\":";
		echo "\"";
		$district = preg_replace('/[^(\x20-\x7F)]*/','', $district);
		echo $district;
		echo"\"";
		echo "}";

		$firstloop = FALSE;
	}

	echo "]";
}
else
{
	/* Marc says "I don't know about that" */
	echo "{}";
}

?>  
