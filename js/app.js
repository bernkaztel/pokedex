    const data2 = {};
    //Function to show default Modal 
    function showModal(event) {
        var eventTarget = event.target;
        var eventTrigger = eventTarget.parentNode;
        var mymodal = $('#myModal');
        // console.log(thisa.dataset.alliance);
        mymodal.find('#modaltitle').text(eventTrigger.dataset.name);
        mymodal.find('#imagemodal').attr('src', eventTrigger.dataset.image);
        mymodal.find('#type').text(eventTrigger.dataset.genre);
        mymodal.find('#habitat').text(eventTrigger.dataset.habitat);
        mymodal.find('#group').text(eventTrigger.dataset.group);
        mymodal.find('#description').text(eventTrigger.dataset.description);
        mymodal.modal('show');
    }


    //Array with pokemon images
    const imagePokemon = {
        blastoise: "assets/images/blastoise.jpg",
        ivysaur: "assets/images/ivysaur.jpg",
        bulbasaur: "assets/images/bulbasaur.jpg",
        caterpie: "assets/images/caterpie.jpg",
        charizard: "assets/images/charizard.jpg",
        charmeleon: "assets/images/charmeleon.jpg",
        charmander: "assets/images/charmander.jpg",
        squirtle: "assets/images/squirtle.jpg",
        wartortle: "assets/images/wartortle.jpg",
        venusaur: "assets/images/venusaur.jpg",
        metapod: "assets/images/metapod.jpg",
        butterfree: "assets/images/butterfree.jpg",
        weedle: "assets/images/weedle.jpg",
        kakuna: "assets/images/kakuna.jpg",
        beedrill: "assets/images/beedrill.jpg",
        pidgey: "assets/images/pidgey.jpg",
        pidgeotto: "assets/images/pidgeotto.jpg",
        pidgeot: "assets/images/pidgeot.jpg",
        rattata: "assets/images/rattata.jpg",
        raticate: "assets/images/raticate.jpg",
        spearow: "assets/images/spearow.jpg",

    };


    function searchPokemons(params) {
        const searchValue = document.getElementById('pokeSearch10').value;
        let allPokemonsContainer = document.getElementsByClassName("pokemonContainer");
        const allPokemonsContainerArray = Array.prototype.slice.call(allPokemonsContainer);
        // console.log(allPokemonsContainerArray);
        for (i = 0; i < allPokemonsContainerArray.length; i++) {
            let pokemonNameSearch = allPokemonsContainerArray[i].id;
            // console.log(pokemonNameSearch);
            let parent = allPokemonsContainerArray[i].closest('.pokemonContainer');
            if (searchValue == pokemonNameSearch) {
                parent.classList.remove("hidden-xs-up");
            } else {
                parent.classList.add("hidden-xs-up");
            }
     }
    }


     function showAll(params) {
        let allPokemonsContainer = document.getElementsByClassName("pokemonContainer");
        const allPokemonsContainerArray = Array.prototype.slice.call(allPokemonsContainer);
        for (i = 0; i < allPokemonsContainerArray.length; i++) {
            allPokemonsContainerArray[i].classList.remove("hidden-xs-up");
        }
     }
     

    $(document).ready(function () {

                //Get data from pokedex (all pokemons) first AJAX call
                $.ajax({
                    type: "GET",
                    url: "https://pokeapi.co/api/v2/pokedex/1/",
                    success: function (data) {
                        console.log(data);
                        const pokemonList = data.pokemon_entries;
                        for (let index = 0; index < 10; index++) {
                            const pokemon = pokemonList[index];
                            const pokemonName = data.name;
                            getPokemon(pokemon);
                        }
                    },
                    dataType: 'json',
                }); //End first AJAX call

                //Get url to make second AJAX call
                function getPokemon(pokemon) {
                    const pokemonUrl = pokemon.pokemon_species.url;
                    getAllDataPokemon(pokemonUrl);
                } //Final getPokemon

                //Get the data of the specified pokemon and make second AJAX call
                function getAllDataPokemon(pokemonUrl) {
                    $.ajax({
                        type: "GET",
                        url: pokemonUrl,
                        success: function (data) {
                            const pokemonName = data.name;
                            const pokemonColor = data.color.name;
                            const pokemonGenre = data.genera[4].genus;
                            const pokemonHabitat = data.habitat.name;
                            const pokemonGruop = data.egg_groups[0].name;
                            const pokemonDescription = data.flavor_text_entries[3].flavor_text;
                            const pokemonCaptureRate = data.capture_rate;
                            createDOMPokemons(pokemonName, pokemonColor, pokemonGenre, pokemonHabitat, pokemonGruop, pokemonDescription, pokemonCaptureRate);
                        },
                        dataType: 'json',
                    });
                } //End getAllDataPokemon


                //Creates the DOM elements for each pokemon and passes data to create the modal
                function createDOMPokemons(pokemonName, pokemonColor, pokemonGenre, pokemonHabitat, pokemonGruop, pokemonDescription, pokemonCaptureRate) {
                    var cardColor = '';
                    if(pokemonColor === 'blue') {
                        cardColor = 'card-info';
                    } 
                    if(pokemonColor === 'green') {
                        cardColor = 'card-success ';
                    } 
                    if(pokemonColor === 'red') {
                        cardColor = 'card-danger';
                    } 
                    if(pokemonColor === 'brown') {
                        cardColor = 'card-warning';
                    } 
                    let class2 = 'card  col-5 d-inline-block m-2  card-inverse pokemonContainer ';
                    let class4 = 'card-img-top pokemon mb-2 mt-2 ';
                    let class3 =  class2.concat(cardColor);
                    let class5 =  class4.concat(pokemonColor);
                    let srcPokemon = imagePokemon[pokemonName];
                    let pokemonContainer = $("<div></div>");
                    pokemonContainer.attr({
                        class: class3,
                        'id': pokemonName,

                    });
                    $("#container-pokemon").append(pokemonContainer);
                    var pokemonImageLink = $("<a></a>");
                    pokemonImageLink.attr({
                        href: '#',
                        'onclick': "showModal(event)",
                        'data-name': pokemonName,
                        'data-color': pokemonColor,
                        'data-genre': pokemonGenre,
                        'data-habitat': pokemonHabitat,
                        'data-group': pokemonGruop,
                        'data-capture': pokemonCaptureRate,
                        'data-description': pokemonDescription,
                        'data-image': srcPokemon,
                    });
                    pokemonContainer.append(pokemonImageLink);
                    let pokemonImage = $("<img></img>");
                    pokemonImage.attr({
                        class: class5,
                        src: srcPokemon
                    });
                    pokemonImageLink.append(pokemonImage);
                    let pokemonBlock = $("<div></div>");
                    pokemonBlock.attr({
                        class: 'card-block',
                        src: srcPokemon
                    });
                    pokemonImageLink.append(pokemonBlock);
                    let pokemonNameDOM = $("<h4></h4>").text(pokemonName);
                    pokemonNameDOM.attr({
                        class: 'card-title',
                    });
                    pokemonBlock.append(pokemonNameDOM);
                } //End create DOM pokemons



            



                }); //End function ready