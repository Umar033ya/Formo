import WorkshopsPage from '../../../features/factories/WorkshopsPage';

// Operator tikuv sexlarini faqat ko'radi, akkaunt ochish superadminda
export default function OperatorFactories() {
  return <WorkshopsPage readOnly />;
}
