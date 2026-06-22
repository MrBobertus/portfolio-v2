document.addEventListener('DOMContentLoaded', function () {
    loadSecret();
    loadProjects();
    loadTools();
    loadSkills();
});

const randomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function loadSecret() {
    const minableDiv = document.getElementById('minable');
    const pickaxe = document.getElementById('pickaxe');
    const audio = document.getElementById('audio');
    const MAX_BREAKING_STAGE = 10;
    const SWING_DELAY = 300;
    const REVERT_ANIMATION_DURATION = 100;
 
    pickaxe.style.top = '0%';
    pickaxe.style.left = '100%';
    pickaxe.style.transform = 'rotate(90deg)';
    pickaxe.classList.remove('hidden');
    let isMining = false;
 
    minableDiv.addEventListener('click', function () {
        if (isMining) return;
        isMining = true;

        let currentStage = parseInt(minableDiv.dataset.breakingstage, 10);
 
        if (currentStage <= MAX_BREAKING_STAGE) {
            pickaxe.style.transform = 'rotate(-90deg)';

            if (currentStage === MAX_BREAKING_STAGE) {
                minableDiv.style.backgroundRepeat = 'no-repeat';
                minableDiv.style.backgroundSize = 'contain';
                minableDiv.style.backgroundPosition = 'center';
                audio.src = `./assets/secret/creeper.mp3`;
            } else {
                audio.src = `./assets/secret/break_sound_${randomNumber(1,2)}.mp3`;
            }
            audio.play();

            minableDiv.style.backgroundImage = `url('./assets/secret/destroy_stage_${currentStage}.png')`;
            minableDiv.dataset.breakingstage = currentStage + 1;
        } else {
            audio.src = `./assets/secret/explode.mp3`;
            audio.play();
            minableDiv.dataset.breakingstage = 0;
            minableDiv.style.backgroundImage = '';
            minableDiv.style.backgroundRepeat = '';
            minableDiv.style.backgroundSize = '';
            minableDiv.style.backgroundPosition = '';
        }
        setTimeout(() => {
            pickaxe.style.transform = 'rotate(90deg)';
            setTimeout(() => {
                isMining = false;
            }, REVERT_ANIMATION_DURATION);
        }, SWING_DELAY);
    })
}

function loadProjects() {
    const projectsJson = fetch('./assets/data/projects.json')
        .then((response) => response.json())
        .then((json) => 
            json.map((project) => {
                const projectsTemplate = `
                <div
                    class="group transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 w-[100%] h-auto bg-[#0f0000] relative rounded-lg shadow-lg shadow-red-900 border-2 border-red-900 flex flex-col justify-start items-start overflow-hidden"
                >
                    <div class="hidden group-hover:flex project-image-overlay absolute top-0 left-0 w-[100%] h-[100%] bg-black/70 justify-center items-center text-5xl gap-8 group-hover:backdrop-blur-[1px]">
                      <a href="${project.live_url}" target="_blank" class="flex items-center hover:text-red-500">
                        <i class="fa-solid fa-globe"></i>
                          <span class="text-2xl ml-2">Live</span>
                      </a>
                      <a href="${project.archive_url}" target="_blank" class="flex items-center hover:text-red-500">
                        <i class="fas fa-external-link-alt"></i>
                          <span class="text-2xl ml-2">Archive</span>
                      </a>
                    </div>
                    <img
                        src="${project.image_url}"
                        class="w-[100%] h-auto object-cover"
                        alt="Project 1"
                    />
                    <div
                        class="w-[100%] h-auto flex flex-col justify-start items-start p-3"
                    >
                        <h2 class="text-white text-3xl font-bold">${project.name}</h2>
                        <p class="text-white text-2xl mt-3">${project.description}</p>
                        <div
                            class="w-[100%] h-auto flex flex-row flex-wrap justify-start items-center gap-3 mt-3"
                        >
                            ${project.tags.map(tag => `<p class="bg-red-500/30 rounded-lg px-2 py-1 text-white">${tag}</p>`).join('')}
                        </div>
                    </div>
                </div>
                `
                document.querySelector('#projects').innerHTML += projectsTemplate;
            })
        );
}

function loadTools() {
    const toolsJson = fetch('./assets/data/tools.json')
        .then((response) => response.json())
        .then((json) => 
            json.map((tool) => {
                const toolsTemplate = `
                <div
                    class="transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 w-[100%] h-[200px] bg-[#0f0000] rounded-lg shadow-lg shadow-red-900 border-2 border-red-900 flex flex-col justify-start items-center p-4"
                >
                    <img
                        src="${tool.image_url}"
                        class="w-[100%] h-[100%] object-contain"
                        alt="HTML"
                    />
                    <h2 class="text-white text-3xl font-bold">${tool.name}</h2>
                </div>
                `
                document.querySelector('#tools').innerHTML += toolsTemplate;
            })
        );
}

function loadSkills() {
    const skillJson = fetch('./assets/data/skills.json')
        .then((response) => response.json())
        .then((json) => 
            json.map((skill) => {
                const skillsTemplate = `
                <div
                    class="transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 w-[100%] h-[200px] bg-[#0f0000] rounded-lg shadow-lg shadow-red-900 border-2 border-red-900 flex flex-col justify-start items-center p-4"
                >
                    <img
                        src="${skill.image_url}"
                        class="w-[100%] h-[100%] object-contain"
                        alt="HTML"
                    />
                    <h2 class="text-white text-3xl font-bold">${skill.name}</h2>
                </div>
                `
                document.querySelector('#skills').innerHTML += skillsTemplate;
            })
        );
}