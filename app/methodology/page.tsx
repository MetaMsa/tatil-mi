"use client";

export default function Disclaimer() {
  return (
    <div className="m-3 text-center bg-white p-3 rounded-xl shadow">
      <section className="methodology">
        <h2>Metodoloji</h2>

        <p>
          Bu site, Türkiye genelindeki kar tatili duyurularını tek bir platformda
          toplamak amacıyla geliştirilmiştir. İçerikler, tamamen{" "}
          <strong>otomatik bir sistem</strong> aracılığıyla kamuya açık
          kaynaklardan derlenmektedir.
        </p>

        <h3>Veri Kaynakları</h3>
        <p>
          Sitede yer alan bilgiler aşağıdaki kaynak türlerinden elde edilir:
        </p>
        <ul>
          <li>Valiliklerin ve resmî kurumların web siteleri</li>
          <li>Resmî duyuru sayfaları ve RSS akışları</li>
          <li>
            Valilikler ve ilgili kurumlara ait doğrulanmış sosyal medya
            hesapları
          </li>
        </ul>

        <p>
          Her il için kullanılan kaynaklar önceden tanımlıdır ve sistem yalnızca
          bu kaynakları tarar.
        </p>

        <h3>Veri Toplama Süreci</h3>
        <ul>
          <li>
            Veri toplama işlemi, zamanlanmış görevler (cron) aracılığıyla
            belirli aralıklarla otomatik olarak gerçekleştirilir.
          </li>
          <li>
            Her il için kaynaklar kontrollü ve sıralı şekilde taranır. Bu sayede
            kaynaklara aşırı yük bindirilmez.
          </li>
          <li>
            Toplanan içerikler standart bir veri yapısına dönüştürülerek
            veritabanına kaydedilir.
          </li>
        </ul>

        <h3>Güncellik ve Kontrol</h3>
        <ul>
          <li>
            Sistem, daha önce toplanmış verilerin güncelliğini kontrol eder.
          </li>
          <li>Güncel olduğu tespit edilen veriler tekrar çekilmez.</li>
          <li>
            Yeni veya güncellenmiş duyurular otomatik olarak sisteme eklenir.
          </li>
        </ul>

        <h3>Doğrulama ve Sınırlamalar</h3>
        <p>
          Bu site bir doğrulama veya resmî onay mekanizması değildir. İçerikler,
          kaynakta yayınlandığı şekliyle aktarılır.
        </p>

        <p>
          Kaynaklardaki gecikmeler, sonradan yapılan değişiklikler, hatalı veya
          eksik paylaşımlar sitenin içeriğine de yansıyabilir. Bu nedenle
          kullanıcıların, nihai kararlarını almadan önce
          <strong>
            ilgili resmî kurumların kendi açıklamalarını kontrol etmeleri
            önerilir
          </strong>
          .
        </p>

        <h3>Amaç</h3>
        <p>
          Bu platformun amacı, kullanıcıların farklı kaynakları tek tek takip
          etme ihtiyacını azaltmak ve bilgilere hızlı erişim sağlamaktır.
          Sunulan içerikler bilgilendirme amaçlıdır ve resmî karar niteliği
          taşımaz.
        </p>
      </section>
    </div>
  );
}
