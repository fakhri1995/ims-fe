import { Tabs } from "antd";

const { TabPane } = Tabs;

const TabCandidate = ({ activeTab, setActiveTab }) => {
  return (
    <div className="border-b space-y-3 px-4 mb-3">
      <Tabs
        defaultActiveKey={activeTab}
        className="headerTab"
        onChange={(value) => {
          setActiveTab(value);
        }}
      >
        <TabPane tab="Validated Candidates" key="done" />
        <TabPane tab="Unvalidated Candidates" key="new" />
      </Tabs>
    </div>
  );
};

export default TabCandidate;
