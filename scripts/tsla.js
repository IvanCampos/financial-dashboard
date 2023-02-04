function createGlobeTesla(id, size) {

    const URL = 'https://supercharge.info/service/supercharge/allSites';

    fetch(URL)
        .then(function (response) {
            return response.json();
        }).then(function (superChargers) {

        let globeData = [];

        for (let index = 0; index < superChargers.length; index++) {
            let currentCharger = superChargers[index];
            globeData.push([currentCharger.gps.longitude, currentCharger.gps.latitude]);
        }

        createDiv(id, size);
        let dom = document.getElementById(id);
        let myChart = echarts.init(dom);
        let option;

        let globeBackground = 'ghostwhite';
        const darkCSS = document.getElementById("darkCSS");
        if (darkCSS != null) {
            globeBackground = '#000';
        }

        option = {
            //backgroundColor: '#000',
            globe: {
                viewControl: {
                    animationDurationUpdate: 1000,
                    autoRotateSpeed: 6,
                    autoRotateAfterStill: 1,
                    distance: 150,
                    targetCoord: [-122.1430, 37.4419]
                },
                baseTexture: "data-gl/asset/globe-blue.png",
                heightTexture: "data-gl/asset/world.topo.bathy.200401.jpg",
                displacementScale: 0.04,
                displacementQuality: 'ultra',
                shading: 'realistic',
                environment: globeBackground,
                realisticMaterial: {
                    roughness: 0.2
                },
                postEffect: {
                    enable: false
                },
                light: {
                    main: {
                        intensity: 1,
                        shadow: true
                    },
                    ambientCubemap: {
                        texture: 'data-gl/asset/pisa.hdr',
                        diffuseIntensity: 0.9
                    }
                }
            },series: [{
                type: 'scatter3D',
                blendMode: 'lighter',
                coordinateSystem: 'globe',
                label: {
                    formatter: ''
                },
                zlevel: 99,
                symbol: 'path:// M 173.146 317.299 L 208.622 117.78 c 33.815 0 44.481 3.708 46.021 18.843 c 0 0 22.684 -8.458 34.125 -25.636 C 244.122 90.299 199.263 89.366 199.263 89.366 l -26.176 31.882 l 0.059 -0.004 l -26.176 -31.883 c 0 0 -44.86 0.934 -89.5 21.622 c 11.431 17.178 34.124 25.636 34.124 25.636 c 1.549 -15.136 12.202 -18.844 45.79 -18.868 l 35.762 199.548',
                symbolSize: 5,
                hoverAnimation: false,
                itemStyle: {
                    normal: {
                        color: 'rgba(255, 0, 0, 1.0)'
                    }
                },
                data: globeData
            }]
        };

        option && myChart.setOption(option);

    }).catch(function (error) {
        console.warn('Something went wrong.', error);
    });

}

let topPosition = 3;
let leftPosition = 29;
let rowCount = 0;
const maxRow = 6;

function createDiv(id, size) {
    if (rowCount == 0) {
        //do nothing
    } else if (rowCount == maxRow) {
        rowCount = 0;
        leftPosition = 0;
        topPosition += 0;
    } else {
        leftPosition += 0;
    }
    rowCount += 1;
    let containerElement = document.createElement('div');
    containerElement.id = id;
    containerElement.style.position = "absolute";
    containerElement.style.top = topPosition + "rem";
    containerElement.style.left = leftPosition + "rem";
    containerElement.style.width = size + "rem";
    containerElement.style.height = size + "rem";
    document.getElementById('globe').appendChild(containerElement);
}