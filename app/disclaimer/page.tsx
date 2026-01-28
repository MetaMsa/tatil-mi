import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sorumluluk Reddi",
  alternates: {
    canonical: `https://tatilmi.benserhat.com/disclaimer`,
  },
};

export default function Disclaimer() {
  return (
    <div className="m-3 text-center bg-white p-3 rounded-xl shadow">
      <h2>Sorumluluk Reddi</h2>

      <p>
        Bu sitede yer alan kar tatili ve benzeri duyurular; valilikler, resmi
        kurumlar ve kamuya açık dijital kaynaklardan otomatik olarak
        derlenmektedir. İçerikler bilgilendirme amaçlıdır ve resmî bağlayıcılığı
        bulunmamaktadır. Kaynaklardaki gecikmeler, hatalar, eksik veya sonradan
        değiştirilen duyurular nedeniyle sitede yer alan bilgiler güncel veya
        doğru olmayabilir. Bu nedenle, alınan kararlar ve yapılacak işlemler
        öncesinde ilgili resmî kurumların kendi açıklamalarının esas alınması
        tavsiye edilir. Bu sitede sunulan bilgilere dayanılarak yapılan işlem
        veya alınan kararlar sonucunda doğabilecek doğrudan ya da dolaylı
        zararlardan site yönetimi sorumluluk kabul etmez.
      </p>
    </div>
  );
}
