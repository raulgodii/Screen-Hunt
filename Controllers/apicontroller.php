<?php
    // API key
    $apiKey = "3da0e6a9";
    
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $s = $_GET["s"]; // Movie title to search for

        // URL of the API
        $url = "https://www.omdbapi.com/?apikey=$apiKey&s=$s";

        echo file_get_contents($url);
    }
?>