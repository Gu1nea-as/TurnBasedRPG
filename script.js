$(function(){
    let playerclass = ""
    let playerlv = 0
    let playerhp = 0
    let turn = ""
    let atk = 0
    let def = 0
    let agl = 0
    let critChance = 0
    let critDMG = 2
    let target = 0
    let enemy1status = "Normal"
    let enemy2status = "Normal"
    let enemy3status = "Normal"
    let atkloaded = ''

    let eArr = [
        {name : "Slime", 
        HP: 20, 
        EX: 5, 
        ATK: 5},
        {name: "Boar",
        HP: 30,
        EX: 8,
        ATK: 8},
        {name: "Large Slime",
        HP: 40,
        EX: 12,
        ATK: 10}

    ];


    $('.launchatk').hide()

    $('.Knight').on('click', function(){
        $(".classchosen").html("Selected: Knight")
        playerclass = "Knight"
        playerhp = 100
        atk = 15
        def = 30
        agl = 15
        console.log(playerclass)
    })

    $('.Wizard').on('click', function(){
        $(".classchosen").html("Selected: Wizard")
        playerclass = "Wizard"
        playerhp = 85
        atk = 15
        def = 20
        agl = 20
        console.log(playerclass)
    })

    $('.Rogue').on('click', function(){
        $(".classchosen").html("Selected: Rogue")
        playerclass = "Rogue"
        playerhp = 70
        atk = 20
        def = 15
        agl = 50
    })

    $('.submit-class').on('click', function(){
        $('.pick-class').remove()
        $('.title').remove()
        playerlv = 1
        $('.playerlevel').html(`LV: ${playerlv}`)
        $('.playerhealth').html(`HP: ${playerhp}`)
        $('.item-1').html('(empty)')
        $('.item-2').html('(empty)')
        console.log(playerclass)

        if(playerclass == "Knight"){
            $('.playerclass').html(`Class: Knight`)
            $('.combatlog').prepend('You selected Knight<br>')
            $('.attack-1').html('Strike').prop('title', 'Deal damage equal to ATK')
            $('.attack-2').html('Charge').prop('title', 'Deal damage equal to 1/2 of ATK and 1/3 of DEF; Chance to stun the enemy based on AGL stat.')
            $('.special').html('Sweeping Slash').prop('title', '[LV 5] Deal damage equal to ATK and DEF to all enemies.')
            $('.ATK').html(`ATK: ${atk}`)
            $('.DEF').html(`DEF: ${def}`)
            $('.AGL').html(`AGL: ${agl}`)
            $('.attack-1').on('click', function(){
                $('.launchatk').show()
                atkloaded = 'knight1'
                $('.launchatk').html(`Use Strike`)
            })
            $('.attack-2').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Charge`)
                atkloaded = 'knight2'
            })
            $('.special').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Sweeping Slash`)
                atkloaded = 'knight3'
            })
        }
        if(playerclass == "Wizard"){
            $('.playerclass').html(`Class: Wizard`)
            $('.combatlog').prepend('You selected Wizard<br>')
            $('.attack-1').html('Energy Bolt').prop('title', 'Deal damage equal to ATK')
            $('.attack-2').html('Crystal Comet').prop('title', 'Deal damage equal to ATK to target and 1/4 of ATK to other enemies; crit chance is increased by AGL stat.')
            $('.special').html('Summon Whisp').prop('title', '[LV 5] Your attacks happen twice for 2 turns')
            $('.ATK').html(`ATK: ${atk}`)
            $('.DEF').html(`DEF: ${def}`)
            $('.AGL').html(`AGL: ${agl}`)
            $('.attack-1').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Energy Bolt`)
                atkloaded = 'wizard1'
            })
            $('.attack-2').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Crystal Comet`)
                atkloaded = 'wizard2'
            })
            $('.special').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Summon Whisp`)
                atkloaded = 'wizard3'
            })
        }
        if(playerclass == "Rogue"){
            $('.playerclass').html(`Class: Rogue`)
            $('.combatlog').prepend('You selected Rogue<br>')
            $('.attack-1').html('Slice').prop('title', 'Deal damage equal to ATK')
            $('.attack-2').html('Backstab').prop('title', '50% chance to deal 2x of ATK to an enemy; 50% to get spotted and fail the attack. Guaranteed success at 80 AGL')
            $('.special').html('Shadow Cloak').prop('title', '[LV 5] Dodge attacks for 2 turns')
            $('.ATK').html(`ATK: ${atk}`)
            $('.DEF').html(`DEF: ${def}`)
            $('.AGL').html(`AGL: ${agl}`)
            $('.attack-1').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Slice`)
                atkloaded = 'rogue1'
                console.log(atkloaded)
            })
            $('.attack-2').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Backstab`)
                atkloaded = 'rogue2'
            })
            $('.special').on('click', function(){
                $('.launchatk').show()
                $('.launchatk').html(`Use Shadow Cloak`)
                atkloaded = 'rogue3'
            })

        }

    })

    $('.start-fight').on('click', function(){
        $('.start-fight').remove()
        $('.fight').append(`<p id='current-target'>Current target: None</p>`)
        $('.combatlog').prepend('Started Fight<br>')
        //Spawn 1st enemy
        let temp1 = Math.floor(Math.random() * 3)
        let enemy1hp = eArr[temp1].HP
        $('.combatlog').prepend(`A ${eArr[temp1].name} has appeared!<br>`)
        
        $('.fight').append(`<div class='enemy1'>${eArr[temp1].name} | HP: ${enemy1hp} | Status: ${enemy1status}</div>`)
        $('.fight').append("<button id='select1' class='select1'>Target</div>")
        select1.addEventListener('click', function(){
            target = 1
            $('#current-target').html(`Current target: Enemy ${target}`)
            console.log(enemy1hp)
        })
        //

        let additionalEnemyChance = Math.floor(Math.random() * 11)
        //Chance to spawn 2nd enemy
        let temp2 = Math.floor(Math.random() * 3)
        let enemy2hp = eArr[temp2].HP
        if(additionalEnemyChance <= 7){
            $('.combatlog').prepend(`A ${eArr[temp2].name} has appeared!<br>`)
            $('.fight').append(`<div class='enemy2'>${eArr[temp2].name} | HP: ${enemy2hp} | Status: ${enemy2status}</div>`)
            $('.fight').append("<button id='select2' class='select2'>Target</div>")
            select2.addEventListener('click', function(){
            target = 2
            $('#current-target').html(`Current target: Enemy ${target}`)
        })
        }
        //

        //Chance to spawn 3rd enemy
        let temp3 = Math.floor(Math.random() * 3)
        let enemy3hp = eArr[temp3].HP
        if(additionalEnemyChance <= 3){
            $('.combatlog').prepend(`A ${eArr[temp3].name} has appeared!<br>`)
            $('.fight').append(`<div class='enemy3'>${eArr[temp3].name} | HP: ${enemy3hp} | Status: ${enemy3status}</div>`)
            $('.fight').append("<button id='select3' class='select3'>Target</div>")
            select3.addEventListener('click', function(){
            target = 3
            $('#current-target').html(`Current target: Enemy ${target}`)
        })
        }
        //

        turn = 'player'
        $('.fight').append(`<div class='current-turn'>Current Turn: ${turn}</div>`)

        $('.launchatk').on('click', function(){
            if(target == 0){
                $('.combatlog').prepend('Please Select a Target<br>')
            }
            if(turn == 'player'){
                //SLICE / STRIKE / ENERGY BOLT
                if(atkloaded == 'knight1' || atkloaded == 'wizard1' || atkloaded == 'rogue1'){
                    if(target == 1){
                        enemy1hp -= atk

                        if(enemy1hp < 0){
                            enemy1hp = 0
                        }
                        $('.combatlog').prepend(`Hit ${eArr[temp1].name} for ${atk} damage!<br>`)
                        
                        if(enemy1hp == 0){
                            enemy1status = 'Dead'
                            $('.combatlog').prepend(`${eArr[temp1].name} has been slain<br>`)
                            $('.select1').prop('disabled', true)
                        }
                        $('.enemy1').html(`${eArr[temp1].name} | HP: ${enemy1hp} | Status: ${enemy1status}`)

                        if(enemy1hp == 0){
                            
                        }
                    }
                    if(target == 2){
                        enemy2hp -= atk

                        if(enemy2hp < 0){
                            enemy2hp = 0
                        }
                        $('.combatlog').prepend(`Hit ${eArr[temp2].name} for ${atk} damage!<br>`)
                        if(enemy2hp == 0){
                            enemy2status = 'Dead'
                            $('.combatlog').prepend(`${eArr[temp2].name} has been slain<br>`)
                        }

                        $('.enemy2').html(`${eArr[temp2].name} | HP: ${enemy2hp} | Status: ${enemy2status}`)

                        if(enemy2hp == 0){
                            $('.select2').prop('disabled', true)
                        }
                    }
                    if(target == 3){
                        enemy3hp -= atk

                        if(enemy3hp < 0){
                            enemy3hp = 0
                            
                        }

                        $('.enemy3').html(`${eArr[temp3].name} | HP: ${enemy3hp} | Status: ${enemy3status}`)
                    }
                }
                //BACKSTAB
                if(atkloaded == 'rogue2'){
                    if(target == 1){
                        if(Math.floor(Math.random() * 11) <= 5){
                            enemy1hp -= (atk * 2)
                            $('.combatlog').prepend(`Hit ${eArr[temp1].name} for ${(atk * 2)} damage!<br>`)
                        }else{
                            $('.combatlog').prepend(`${eArr[temp1].name} spotted you, failed backstab!<br>`)
                        }

                        if(enemy1hp < 0){
                            enemy1hp = 0
                        }

                        if(enemy1hp == 0){
                            enemy1status = 'Dead'
                            $('.combatlog').prepend(`${eArr[temp1].name} has been slain<br>`)
                        }
                        
                        $('.enemy1').html(`${eArr[temp1].name} | HP: ${enemy1hp} | Status: ${enemy1status}`)

                        if(enemy1hp == 0){
                            $('.select1').prop('disabled', true)
                        }
                        
                    }
                    if(target == 2){
                        if(Math.floor(Math.random() * 11) <= 5){
                            enemy2hp -= (atk * 2)
                            $('.combatlog').prepend(`Hit ${eArr[temp2].name} for ${(atk * 2)} damage!<br>`)
                        }else{
                            $('.combatlog').prepend(`${eArr[temp2].name} spotted you, failed backstab!<br>`)
                        }

                        if(enemy2hp < 0){
                            enemy2hp = 0
                        }
                        if(enemy2hp == 0){
                            enemy2status = 'Dead'
                            $('.combatlog').prepend(`${eArr[temp2].name} has been slain<br>`)
                        }
                        
                        $('.enemy2').html(`${eArr[temp2].name} | HP: ${enemy2hp} | Status: ${enemy2status}`)
                        
                        if(enemy2hp == 0){
                            $('.select2').prop('disabled', true)
                        }
                    }
                    if(target == 3){
                        if(Math.floor(Math.random() * 11) <= 5){
                            enemy3hp -= (atk * 2)
                            $('.combatlog').prepend(`Hit ${eArr[temp3].name} for ${(atk * 2)} damage!<br>`)
                        }else{
                            $('.combatlog').prepend(`${eArr[temp3].name} spotted you, failed backstab!<br>`)
                        }

                        if(enemy3hp < 0){
                            enemy3hp = 0
                        }

                        if(enemy3hp == 0){
                            enemy3status = 'Dead'
                            $('.combatlog').prepend(`${eArr[temp3].name} has been slain<br>`)
                            $('.select3').prop('disabled', true)
                        }

                        $('.enemy3').html(`${eArr[temp3].name} | HP: ${enemy3hp} | Status: ${enemy3status}`)

                    }
                }
                //CHARGE (FIND A BALANCE CUS THIS IS BROKEN LOL)
                if(atkloaded == 'knight2'){
                    if(target == 1){
                        enemy1hp -= (((atk / 4) * 3) + (def / 3))
                        $('.combatlog').prepend(`Hit ${eArr[temp1].name} for ${(((atk / 4) * 3) + (def / 3))} damage!<br>`)
                        if(Math.floor(Math.random() * 101) <= (agl * 2)){
                            enemy1status = "Stunned"
                            $('.combatlog').prepend(`${eArr[temp1].name} was stunned<br>`)
                        }

                        if(enemy1hp < 0){
                            enemy1hp = 0
                        }
                        if(enemy1hp == 0){
                            enemy1status = "Dead"
                            $('.combatlog').prepend(`${eArr[temp1].name} has been slain<br>`)
                            $('.select1').prop('Disabled', true)
                        }

                        $('.enemy1').html(`${eArr[temp1].name} | HP: ${enemy1hp} | Status: ${enemy1status}`)     
                    }
                    if(target == 2){
                        enemy2hp -= (((atk / 4) * 3) + (def / 3))
                        if(Math.floor(Math.random() * 101) <= (agl * 2)){
                            enemy2status = "Stunned"
                        }

                        if(enemy2hp < 0){
                            enemy2hp = 0
                        }

                        $('.enemy2').html(`${eArr[temp2].name} | HP: ${enemy2hp} | Status: ${enemy2status}`)
                    }
                    if(target == 3){
                        enemy3hp -= (((atk / 4) * 3) + (def / 3))
                        if(Math.floor(Math.random() * 101) <= (agl * 2)){
                            enemy3status = "Stunned"
                        }

                        if(enemy3hp < 0){
                            enemy3hp = 0
                        }

                        $('.enemy3').html(`${eArr[temp3].name} | HP: ${enemy3hp} | Status: ${enemy3status}`)
                    }
                }
                //Crystal Comet
                if(atkloaded == 'wizard2'){
                    if(target == 1){
                        if(Math.floor(Math.random() * 101) <= agl){
                            enemy1hp -= 2*(atk)
                            enemy2hp -= 2*((atk / 4))
                            enemy3hp -= 2*((atk / 4))
                        }else{
                            enemy1hp -= atk
                            enemy2hp -= (atk / 4)
                            enemy3hp -= (atk / 4)
                        }

                        if(enemy1hp < 0){
                            enemy1hp = 0
                        }

                        if(enemy2hp < 0){
                            enemy2hp = 0
                        }

                        if(enemy3hp < 0){
                            enemy3hp = 0
                        }

                        $('.enemy1').html(`${eArr[temp1].name} | HP: ${enemy1hp} | Status: ${enemy1status}`)
                        $('.enemy2').html(`${eArr[temp2].name} | HP: ${enemy2hp} | Status: ${enemy2status}`)
                        $('.enemy3').html(`${eArr[temp3].name} | HP: ${enemy3hp} | Status: ${enemy3status}`)
                    }
                    if(target == 2){
                        if(Math.floor(Math.random() * 101) <= agl){
                            enemy2hp -= 2*(atk)
                            enemy1hp -= 2*((atk / 4))
                            enemy3hp -= 2*((atk / 4))
                        }else{
                            enemy2hp -= atk
                            enemy1hp -= (atk / 4)
                            enemy3hp -= (atk / 4)
                        }

                        if(enemy1hp < 0){
                            enemy1hp = 0
                        }

                        if(enemy2hp < 0){
                            enemy2hp = 0
                        }

                        if(enemy3hp < 0){
                            enemy3hp = 0
                        }

                        $('.enemy1').html(`${eArr[temp1].name} | HP: ${enemy1hp} | Status: ${enemy1status}`)
                        $('.enemy2').html(`${eArr[temp2].name} | HP: ${enemy2hp} | Status: ${enemy2status}`)
                        $('.enemy3').html(`${eArr[temp3].name} | HP: ${enemy3hp} | Status: ${enemy3status}`)
                    }
                    if(target == 3){
                        if(Math.floor(Math.random() * 101) <= agl){
                            enemy3hp -= 2*(atk)
                            enemy1hp -= 2*((atk / 4))
                            enemy2hp -= 2*((atk / 4))
                        }else{
                            enemy3hp -= atk
                            enemy1hp -= (atk / 4)
                            enemy2hp -= (atk / 4)
                        }

                        if(enemy1hp < 0){
                            enemy1hp = 0
                        }

                        if(enemy2hp < 0){
                            enemy2hp = 0
                        }

                        if(enemy3hp < 0){
                            enemy3hp = 0
                        }

                        $('.enemy1').html(`${eArr[temp1].name} | HP: ${enemy1hp} | Status: ${enemy1status}`)
                        $('.enemy2').html(`${eArr[temp2].name} | HP: ${enemy2hp} | Status: ${enemy2status}`)
                        $('.enemy3').html(`${eArr[temp3].name} | HP: ${enemy3hp} | Status: ${enemy3status}`)
                    }
                }

                //SHADOW CLOAK
                // if(atkloaded == 'rogue3'){
                    
                // }
                //SWEEPING SLASH
                // if(atkloaded == 'knight3'){

                // }
                //SUMMON WHISP
                // if(atkloaded == 'wizard3'){

                // }
            }
        })
    })

})