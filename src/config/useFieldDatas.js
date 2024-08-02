import { useState, useEffect } from "react";
import { ApiHelper } from "../helpers/ApiHelper";
import { API } from "./api";
const useFieldDatas = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [featuresList, setFeaturesList] = useState([]);
  const [professionList, setProfessionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCategoryList = async () => {
      try {
        const formdata = { type: "category" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          console.log(
            resData?.data?.data[0]?.features,
            "categoryList useFieldDatas"
          );
          setCategoryList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const getFeaturesList = async () => {
      try {
        const formdata = { type: "features" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          console.log(
            resData?.data?.data[0]?.features,
            "featuresList useFieldDatas"
          );
          setFeaturesList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const getByProfessionList = async () => {
      try {
        const formdata = { type: "profession" };
        const resData = await ApiHelper.post(API.getFieldDatas, formdata);
        if (resData) {
          console.log(
            resData?.data?.data[0]?.features,
            "professionList useFieldDatas "
          );
          setProfessionList(resData?.data?.data[0]?.features);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    getCategoryList();
    getFeaturesList();
    getByProfessionList();
  }, []);

  return { categoryList, featuresList, professionList };
};

export default useFieldDatas;
