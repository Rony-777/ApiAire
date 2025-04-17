#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

#define DHTPIN 33
#define DHTTYPE DHT11
#define SENSOR_PIN 32
#define RL 10.0  // Resistencia de carga en kΩ
#define VCC 3.3

float Ro = 4.0; 


DHT dht(DHTPIN, DHTTYPE);

const char* ssid = "Rony";
const char* password = "Ronald2025";
const char* serverURL = "https://apiaire.onrender.com/api/aire/cargar";  // tu endpoint en Render

void setup() {
  Serial.begin(9600);
  dht.begin();
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado a WiFi");
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverURL);
    http.addHeader("Content-Type", "application/json");

    float Rs = calcularRs();
    float ratio = Rs / Ro;
    float ppm = calcularPPM(ratio);

    float CO_ppm = ppm;     
    float temp = dht.readTemperature();      
    String pm25 = Serial.readStringUntil('\n');

    float = temp-11;

    Serial.println(ppm);
    Serial.println(temp);
    Serial.println(pm25);

    String json = "{";
    json += "\"CO_ppm\":" + String(CO_ppm, 1) + ",";
    json += "\"temp\":" + String(temp, 1) + ",";
    json += "\"pm25\":" + pm25;
    json += "}";

    // Envío del POST
    int httpResponseCode = http.POST(json);

    Serial.print("Respuesta: ");
    Serial.println(httpResponseCode);

    http.end();
    if( httpResponseCode < 0){
        ESP.restart();
    }
  }

  delay(15000); // cada 15 segundos
}


float calcularRs() {
  int sensorValue = analogRead(SENSOR_PIN);
  float voltage = sensorValue * (VCC / 4095.0);
  return ((VCC * RL) / voltage) - RL;
}

float calcularPPM(float ratio) {
  float m = -0.77;
  float b = 1.7;
  return pow(10, (log10(ratio) - b) / m);
}
