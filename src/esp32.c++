#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>


#define SENSOR_PIN 33
#define DHTPIN 32
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);


const char* ssid = "CAIPA2";
const char* password = "Cristian2022";

void setup(){
    Serial.begin(115200);
    delay(1000);

    WiFi.mode(WIFI_STA); //Optional
    WiFi.begin(ssid, password);
    Serial.println("\nConnecting");

    while(WiFi.status() != WL_CONNECTED){
        Serial.print(".");
        delay(100);
    }
    dht.begin();  
    Serial.println("\nConnected to the WiFi network");
    Serial.print("Local ESP32 IP: ");
    Serial.println(WiFi.localIP());
}

void loop() {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    
    int sensorValueMQ7 = analogRead(SENSOR_PIN); 
    float voltage = sensorValueMQ7 * (3.3 / 4095.0);
    float temperature = dht.readTemperature();

    if (isnan(temperature)) {
      Serial.println("Error al leer del sensor DHT11");
      return;
    }

    // Especifica la URL del servidor al que deseas enviar los datos
    http.begin("http://192.168.20.15:3000/api/aire?co2="+ String(voltage) +"&temp="+ String(temperature));  // Cambia la URL según sea necesario

    // Configura el tipo de contenido
    int httpCode = http.GET();

    // Verifica el código de respuesta del servidor
    if (httpCode > 0) {
      String payload = http.getString();  // Obtiene la respuesta del servidor
      Serial.println(payload);  // Imprime la respuesta en el monitor serial
    } else {
      Serial.println("Error en la solicitud GET");
    }
    
    http.end();  // Finaliza la conexión
  }

  delay(10000);  // Espera 10 segundos antes de hacer otra solicitud
}