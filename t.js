const API_KEY = 'AIzaSyA227ykrmObYmz19kT80CayebloBSTrnmk'; // Clave de API proporcionada
 const RANDOM_VIDEOS_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=US&key=${API_KEY}&maxResults=10`;
 const SEARCH_URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${API_KEY}&q=`;
 
 $(document).ready(function() {
   // Cargar videos aleatorios al cargar la página
   loadRandomVideos();
 
   // Manejador de eventos para el botón de búsqueda
   $('#execute-search').on('click', function() {
     const query = $('#search-input').val();
     if (query) {
       loadSearchResults(query);
     }
   });
 
   // Manejador de eventos para cerrar el reproductor flotante
   $('#close-float').on('click', function() {
     $('#player-float').hide(); // Ocultar el reproductor flotante
     $('#player').attr('src', ''); // Detener el video
   });
 
   // Manejador de eventos para el botón de inicio
   $('#home-button').on('click', function() {
     $('#search-container').hide();
     $('#video-container').show();
     loadRandomVideos();
     $('#player-float').hide(); // Asegúrate de que el reproductor flotante esté oculto
   });
 
   // Manejador de eventos para el botón de búsqueda
   $('#search-button').on('click', function() {
     $('#video-container').hide();
     $('#search-container').show();
     $('#search-results').empty(); // Limpiar resultados de búsqueda
     $('#player-float').hide(); // Asegúrate de que el reproductor flotante esté oculto
   });
 });
 
 // Función para cargar videos aleatorios
 function loadRandomVideos() {
   $.get(RANDOM_VIDEOS_URL, function(data) {
     $('#video-container').empty();
     data.items.forEach(video => {
       const videoItem = `
                 <div class="video-item" data-video-id="${video.id}" data-title="${video.snippet.title}">
                     <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                     <h3>${video.snippet.title}</h3>
                 </div>
             `;
       $('#video-container').append(videoItem);
     });
 
     // Agregar evento de clic a los videos
     $('.video-item').on('click', function() {
       const videoId = $(this).data('video-id');
       const videoTitle = $(this).data('title');
       playVideo(videoId, videoTitle);
     });
   });
 }
 
 // Función para buscar videos
 function loadSearchResults(query) {
   $.get(SEARCH_URL + encodeURIComponent(query), function(data) {
     $('#search-results').empty();
     data.items.forEach(video => {
       const videoItem = `
                 <div class="video-item" data-video-id="${video.id.videoId}" data-title="${video.snippet.title}">
                     <img src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}">
                     <h3>${video.snippet.title}</h3>
                 </div>
             `;
       $('#search-results').append(videoItem);
     });
 
     // Mostrar resultados de búsqueda y ocultar contenedor de videos
     $('#search-results').show();
     $('#video-container').hide();
 
     // Agregar evento de clic a los videos de búsqueda
     $('.video-item').on('click', function() {
       const videoId = $(this).data('video-id');
       const videoTitle = $(this).data('title');
       playVideo(videoId, videoTitle);
     });
   });
 }
 
 // Función para reproducir el video
 function playVideo(videoId, title) {
   $('#player-float').show(); // Mostrar el reproductor
   $('#player').attr('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`); // Reproducir video
   $('#video-title').text(title); // Mostrar el título del video
 }