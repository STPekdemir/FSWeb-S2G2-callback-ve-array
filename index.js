const { fifaData } = require('./fifa.js')


/* Görev 1: 
	Verilen datayı parçalayarak aşağıdaki verileri (console.log-ing) elde ederek pratik yapın. 
	
	💡 İPUCU: Öncelikle datayı filtrelemek isteyebilirsiniz */

//(a) 2014 Dünya kupası Finali Evsahibi takım ismi (dizide "Home Team Name" anahtarı)
const ikiBinOnDortFinaliEvSahibi = fifaData.filter(ikiBinOnDortFinaliEvSahibi => {
	return ikiBinOnDortFinaliEvSahibi.Year === 2014 && ikiBinOnDortFinaliEvSahibi.Stage === "Final"
});
console.log(ikiBinOnDortFinaliEvSahibi[0]["Home Team Name"])

//(b) 2014 Dünya kupası Finali Deplasman takım ismi  (dizide "Away Team Name" anahtarı)
const ikiSıfırBirDortDeplasmanTakımIsmi = fifaData.filter( ikiSıfırBirDortDeplasmanTakımIsmi => {
	return ikiSıfırBirDortDeplasmanTakımIsmi.Year === 2014 && ikiSıfırBirDortDeplasmanTakımIsmi.Stage === "Final"
});
console.log(ikiSıfırBirDortDeplasmanTakımIsmi[0]["Away Team Name"])

//(c) 2014 Dünya kupası finali Ev sahibi takım golleri (dizide "Home Team Goals" anahtarı)
const ikiBinOnDortFinaliEvSahibiTakımGolleri = fifaData.filter(ikiBinOnDortFinaliEvSahibiTakımGolleri => {
	return ikiBinOnDortFinaliEvSahibiTakımGolleri.Year === 2014 && ikiBinOnDortFinaliEvSahibiTakımGolleri.Stage === "Final"
});
console.log(ikiBinOnDortFinaliEvSahibiTakımGolleri[0]["Home Team Goals"])
//(d)2014 Dünya kupası finali Deplasman takım golleri  (dizide "Away Team Goals" anahtarı)
const ikiBinOnDortFinaliDeplasmanTakımGolleri = fifaData.filter(ikiBinOnDortFinaliDeplasmanTakımGolleri => {
	return ikiBinOnDortFinaliDeplasmanTakımGolleri.Year === 2014 && ikiBinOnDortFinaliDeplasmanTakımGolleri.Stage === "Final"
});
console.log(ikiBinOnDortFinaliDeplasmanTakımGolleri[0]["Away Team Goals"])

//(e) 2014 Dünya kupası finali kazananı*/



/*  Görev 2: 
	Finaller adlı fonksiyonu kullanarak aşağıdakileri uygulayın:
	1. Bir dizi(array) olan Fifa datasını fonksiyonun birinci parametresi olarak alacak
	2. Sadece final maçlarını içeren nesnenin(object) datalarını filtreleyerek, bir dizi olarak döndürecek(return)
	
	💡 İPUCU - verilen data içindeki nesnelerin(objects) "Stage" anahtarına bakmalısınız
*/

function Finaller(data) {
	let finalMaclari = data.filter(data2 => (
		 data2["Stage"] === "Final")
	)
	return finalMaclari
}
console.log(Finaller(fifaData))



/*  Görev 3: 
	Bir higher-order fonksiyonu olan Yillar isimli fonksiyona aşağıdakileri uygulayın: 
	1. fifaData dizisini(array) fonksiyonun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Finaller data setindeki tüm yılları içeren "years" adındaki diziyi(array) döndürecek
	*/

function Yillar(data3, callBack) {
	let finalYillari = callBack(data3).map(veri => veri["Year"])
    return finalYillari
}

console.log(Yillar(fifaData, Finaller))
/*  Görev 4: 
	Bir higher-order fonksiyonunu olan Kazananlar isimli fonksiyona aşağıdakileri uygulayın:  
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Her final maçının kazananını (evsahibi ya da deplasman) belirleyecek
	💡 İPUCU: Beraberlikler(ties) için şimdilik endişelenmeyin (Detaylı bilgi için README dosyasına bakabilirsiniz.)
	4. Tüm kazanan ülkelerin isimlerini içeren `kazananlar` adında bir dizi(array) döndürecek(return)  */ 

function Kazananlar(data4, callBack) {
let kazananlar = callBack(data4).map(veri => {
	if (veri["Home Team Goals"]>veri["Away Team Goals"]) {
		return veri["Home Team Name"]
	} else if (veri["Home Team Goals"]<veri["Away Team Goals"]) {
		return veri["Away Team Name"]
	} else  {
		return veri["Win conditions"].split(" win")[0]
	}
})	
return kazananlar
}
console.log(Kazananlar(fifaData, Finaller))


/*  Görev 5: 
	Bir higher-order fonksiyonu olan YillaraGoreKazananlar isimli fonksiyona aşağıdakileri uygulayın:
	1. fifaData dizisini(array) fonksiyonunun birinci parametresi olarak alacak
	2. Görev 2'de yazdığınız Finaller fonksiyonunu, geriçağırım(callback) olarak fonksiyonun ikinci parametresi olarak alacak
	3. Görev 3'de yazdığınız Yillar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun üçüncü parametresi olarak alacak
	4. Görev 4'de yazdığınız Kazananlar fonksiyonunu, geriçağırım(callback) olarak fonksiyonun dördüncü parametresi olarak alacak
	5. Her yıl için "{yıl} yılında, {ülke} dünya kupasını kazandı!" cümlesini(string) içeren bir diziyi(array) döndürecek
	
	💡 İPUCU: her cümlenin adım 4'te belirtilen cümleyle birebir aynı olması gerekmektedir.
*/

function YillaraGoreKazananlar(data, callBackFinaller, callBackYillar, callBackKazananlar) {
let kazananlarListesi = callBackFinaller(data).map((mac,i) =>{
	return mac.Year + " yılında, " + callBackKazananlar(data, callBackFinaller)[i] + " dünya kupasını kazandı!";
})	
return kazananlarListesi
}
console.log(YillaraGoreKazananlar (fifaData, Finaller, Yillar, Kazananlar))


/*  Görev 6: 
	Bir higher order fonksiyonu olan `OrtalamaGolSayisi` isimli fonksiyona aşağıdakileri uygulayın: 
	1. Görev 2'de yazdığınız `Finaller` fonksiyonunu birinci parametre olarak alacak; 'fifaData' dizisini argüman olarak eklediğinizden emin olun
	
	💡 İPUCU: Çağırma örneği: `OrtalamaGolSayisi(Finaller(fifaData));`
	
	2. Her maç için Ortalama toplam evsahibi gol sayısı ve toplam deplasman gol sayısını hesaplayacak (her maçta atılan toplam gol sayısı)
	
	3. Sonucun 2. ondalığını yuvarlayıp, bulunan değeri döndürecek(return)
	
	💡 İPUCU: .reduce, .toFixed (dizilim(syntax) için MDN'ye bakın) kullan, ve bunu 2 adımda yapın) 
	
*/
console.clear()
function OrtalamaGolSayisi(finaller) {
const toplamGol = finaller.reduce((toplam, gol) => 
	toplam + gol["Home Team Goals"] + gol["Away Team Goals"], 
	0
)
return (toplamGol/finaller.length).toFixed(2)	
}
console.log(OrtalamaGolSayisi(Finaller(fifaData)))



/// EKSTRA ÇALIŞMALAR ///

/*  BONUS 1:  
	`UlkelerinKazanmaSayilari` isminde bir fonksiyon oluşturun, parametre olarak `data` ve `takım kısaltmalarını` alacak ve hangi ülkenin kaç dünya kupası olduğunu döndürecek
	
	İpucu: "takım kısaltmaları" (team initials) için datada araştırma yapın!
İpucu: `.reduce` Kullanın*/
let takimKisaltmasi = [];
fifaData.forEach(item => {
	if (!takimKisaltmasi.includes(item["Home Team Initials"])) {
		takimKisaltmasi.push(item["Home Team Initials"]);
	}
	if (!takimKisaltmasi.includes(item["Away Team Initials"])) {
		takimKisaltmasi.push(item["Away Team Initials"]);
	}

})
function UlkelerinKazanmaSayilari(gelenVeri, takimKisaltmasi) {
	
		let kazananlar = gelenVeri.filter(match => match["Stage"] === "Final").map(array => {
			if (array["Home Team Goals"] > array["Away Team Goals"]) {
				return array["Home Team Initials"];
			}
			else if (array["Home Team Goals"] < array["Away Team Goals"]) {
				return array["Away Team Initials"];
			} else {
				let kazananTakim = (array["Win conditions"]).split(" win")[0];
				if (kazananTakim === array["Home Team Name"]) {
					return array["Home Team Initials"];
				} else {
					return array["Away Team Initials"];
				}
			}
		});
		
		
			let kazanmaSayisi = kazananlar.reduce((total, kazanan) => {
				if (kazanan in total){
					 total[kazanan] += 1;
				}else{
					total[kazanan] = 1;
				}
				return total;
			},{})
			return kazanmaSayisi;
		}
	
	console.log(UlkelerinKazanmaSayilari(fifaData, takimKisaltmasi));



/*  BONUS 2:  
EnCokGolAtan() isminde bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupası finallerinde en çok gol atan takımı döndürsün */

function EnCokGolAtan(gelenVeri) {
	let evSahibiCokGolAtan;
	let finaller = gelenVeri.filter(mac => mac["Stage"] === "Final")
	console.log(finaller);
}


/*  BONUS 3: 
EnKotuDefans() adında bir fonksiyon yazın, `data` yı parametre olarak alsın ve Dünya kupasında finallerinde en çok golü yiyen takımı döndürsün*/

function EnKotuDefans(/* kodlar buraya */) {
	
    /* kodlar buraya */
	
}


/* Hala vaktiniz varsa, README dosyasında listelenen hedeflerden istediğinizi aşağıdaki boşluğa yazabilirsiniz. */


/* Bu satırın aşağısındaki kodları lütfen değiştirmeyin */
function sa(){
    console.log('Kodlar çalışıyor');
    return 'as';
}
sa();
module.exports = {
    sa,
    Finaller,
    Yillar,
    Kazananlar,
    YillaraGoreKazananlar,
    OrtalamaGolSayisi
}
