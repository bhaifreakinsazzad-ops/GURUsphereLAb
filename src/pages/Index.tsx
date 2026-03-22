import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClassroomSection from "@/components/ClassroomSection";
import LibrarySection from "@/components/LibrarySection";
import ExamSection from "@/components/ExamSection";
import KnowledgeTreeSection from "@/components/KnowledgeTreeSection";
import UniqueFeatures from "@/components/UniqueFeatures";
import ClubsSection from "@/components/ClubsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ClassroomSection />
      <LibrarySection />
      <ExamSection />
      <KnowledgeTreeSection />
      <UniqueFeatures />
      <ClubsSection />
      <FooterSection />
    </div>
  );
};

export default Index;
