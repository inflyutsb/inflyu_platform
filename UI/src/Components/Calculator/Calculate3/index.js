import React, { useEffect, useState } from "react";
import TopBar from "../../../Common/TopBar";
import Navbar from "../../../Common/Sidebar/sidebar";
import './index.scss';
import NFormatter from "../../../Common/NumberFormatter/numFormatter";
import { useParams, useNavigate } from "react-router-dom";
import bdayIcon from '../../../Assets/Images/bdayIcon.png';
import categoryIcon from '../../../Assets/Images/categoryIcon.png';
import locationIcon from '../../../Assets/Images/locationIcon.png';
import { Input } from 'reactstrap';
import Button from '@mui/material/Button';
import { components } from "react-select";
import PropTypes from "prop-types";
import { default as ReactSelect } from "react-select";

const ageGroup = [
    { value: "0-17", label: "0 - 17" },
    { value: "18-24", label: "18 - 24" },
    { value: "25-34", label: "25 - 34" },
    { value: "35-54", label: "35 - 54" },
    { value: "55+", label: "55+" },
];

const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Others", label: "Others" },
]

const categoryOptions = [
    { value: 'Art', label: 'Art' },
    { value: 'Beauty', label: 'Beauty' },
    { value: 'Bollywood', label: 'Bollywood' },
    { value: 'Cinema', label: 'Cinema' },
    { value: 'Comedy', label: 'Comedy' },
    { value: 'Community Page', label: 'Community Page' },
    { value: 'Dancer', label: 'Dancer' },
    { value: 'Education', label: 'Education' },
    { value: 'Fashion', label: 'Fashion' },
    { value: 'Fitness', label: 'Fitness' },
    { value: 'Food', label: 'Food' },
    { value: 'Lifestyle', label: 'Lifestyle' },
    { value: 'Makeup', label: 'Makeup' },
    { value: 'Media', label: 'Media' },
    { value: 'Model', label: 'Model' },
    { value: 'Mom', label: 'Mom' },
    { value: 'Music', label: 'Music' },
    { value: 'Parenting', label: 'Parenting' },
    { value: 'Personal Care', label: 'Personal Care' },
    { value: 'Other', label: 'Other' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Tech', label: 'Tech' },
    { value: 'Travel', label: 'Travel' },
]

const regionOptions = [
    { label: 'AndhraPradesh', value: 'AndhraPradesh' },
    { label: 'Andaman&NicobarIslands', value: 'Andaman&NicobarIslands' },
    { label: 'ArunachalPradesh', value: 'ArunachalPradesh' },
    { label: 'Assam', value: 'Assam' },
    { label: 'Bihar', value: 'Bihar' },
    { label: 'Chandigarh', value: 'Chandigarh' },
    { label: 'Chhattisgarh', value: 'Chhattisgarh' },
    { label: 'Dadra&NagarHaveli', value: 'Dadra&NagarHaveli' },
    { label: 'TamilNadu', value: 'TamilNadu' },
    { label: 'Karnataka', value: 'Karnataka' },
    { label: 'Haryana', value: 'Haryana' },
    { label: 'Jharkhand', value: 'Jharkhand' },
    { label: 'Jammu&Kashmir', value: 'Jammu&Kashmir' },
    { label: 'HimachalPradesh', value: 'HimachalPradesh' },
    { label: 'Gujarat', value: 'Gujarat' },
    { label: 'Goa', value: 'Goa' },
    { label: 'Delhi', value: 'Delhi' },
    { label: 'Telangana', value: 'Telangana' },
    { label: 'Kerala', value: 'Kerala' },
    { label: 'Ladakh', value: 'Ladakh' },
    { label: 'Lakshadweep', value: 'Lakshadweep' },
    { label: 'MadhyaPradesh', value: 'MadhyaPradesh' },
    { label: 'Maharashtra', value: 'Maharashtra' },
    { label: 'Manipur', value: 'Manipur' },
    { label: 'Meghalaya', value: 'Meghalaya' },
    { label: 'Mizoram', value: 'Mizoram' },
    { label: 'Nagaland', value: 'Nagaland' },
    { label: 'Odisha(Orissa)', value: 'Odisha(Orissa)' },
    { label: 'Puducherry(Pondicherry)', value: 'Puducherry(Pondicherry)' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Punjab', value: 'Punjab' },
    { label: 'Sikkim', value: 'Sikkim' },
    { label: 'Tripura', value: 'Tripura' },
    { label: 'Uttarakhand(Uttaranchal)', value: 'Uttarakhand(Uttaranchal)' },
    { label: 'UttarPradesh', value: 'UttarPradesh' },
    { label: 'Westbengal', value: 'Westbengal' },
]

const cityOptions = [
    { label: 'Adilabad', value: 'Adilabad' },
    { label: 'Agra', value: 'Agra' },
    { label: 'Ahmedabad', value: 'Ahmedabad' },
    { label: 'Ahmednagar', value: 'Ahmednagar' },
    { label: 'Aizawl', value: 'Aizawl' },
    { label: 'Ajitgarh (Mohali)', value: 'Ajitgarh (Mohali)' },
    { label: 'Ajmer', value: 'Ajmer' },
    { label: 'Akola', value: 'Akola' },
    { label: 'Alappuzha', value: 'Alappuzha' },
    { label: 'Aligarh', value: 'Aligarh' },
    { label: 'Alirajpur', value: 'Alirajpur' },
    { label: 'Allahabad', value: 'Allahabad' },
    { label: 'Almora', value: 'Almora' },
    { label: 'Alwar', value: 'Alwar' },
    { label: 'Ambala', value: 'Ambala' },
    { label: 'Ambedkar Nagar', value: 'Ambedkar Nagar' },
    { label: 'Amravati', value: 'Amravati' },
    { label: 'Amreli district', value: 'Amreli district' },
    { label: 'Amritsar', value: 'Amritsar' },
    { label: 'Anand', value: 'Anand' },
    { label: 'Anantapur', value: 'Anantapur' },
    { label: 'Anantnag', value: 'Anantnag' },
    { label: 'Angul', value: 'Angul' },
    { label: 'Anjaw', value: 'Anjaw' },
    { label: 'Anuppur', value: 'Anuppur' },
    { label: 'Araria', value: 'Araria' },
    { label: 'Ariyalur', value: 'Ariyalur' },
    { label: 'Arwal', value: 'Arwal' },
    { label: 'Ashok Nagar', value: 'Ashok Nagar' },
    { label: 'Auraiya', value: 'Auraiya' },
    { label: 'Aurangabad', value: 'Aurangabad' },
    { label: 'Aurangabad', value: 'Aurangabad' },
    { label: 'Azamgarh', value: 'Azamgarh' },
    { label: 'Badgam', value: 'Badgam' },
    { label: 'Bagalkot', value: 'Bagalkot' },
    { label: 'Bageshwar', value: 'Bageshwar' },
    { label: 'Bagpat', value: 'Bagpat' },
    { label: 'Bahraich', value: 'Bahraich' },
    { label: 'Baksa', value: 'Baksa' },
    { label: 'Balaghat', value: 'Balaghat' },
    { label: 'Balangir', value: 'Balangir' },
    { label: 'Balasore', value: 'Balasore' },
    { label: 'Ballia', value: 'Ballia' },
    { label: 'Balrampur', value: 'Balrampur' },
    { label: 'Banaskantha', value: 'Banaskantha' },
    { label: 'Banda', value: 'Banda' },
    { label: 'Bandipora', value: 'Bandipora' },
    { label: 'Bangalore Rural', value: 'Bangalore Rural' },
    { label: 'Bangalore Urban', value: 'Bangalore Urban' },
    { label: 'Banka', value: 'Banka' },
    { label: 'Bankura', value: 'Bankura' },
    { label: 'Banswara', value: 'Banswara' },
    { label: 'Barabanki', value: 'Barabanki' },
    { label: 'Baramulla', value: 'Baramulla' },
    { label: 'Baran', value: 'Baran' },
    { label: 'Bardhaman', value: 'Bardhaman' },
    { label: 'Bareilly', value: 'Bareilly' },
    { label: 'Bargarh (Baragarh)', value: 'Bargarh (Baragarh)' },
    { label: 'Barmer', value: 'Barmer' },
    { label: 'Barnala', value: 'Barnala' },
    { label: 'Barpeta', value: 'Barpeta' },
    { label: 'Barwani', value: 'Barwani' },
    { label: 'Bastar', value: 'Bastar' },
    { label: 'Basti', value: 'Basti' },
    { label: 'Bathinda', value: 'Bathinda' },
    { label: 'Beed', value: 'Beed' },
    { label: 'Begusarai', value: 'Begusarai' },
    { label: 'Belgaum', value: 'Belgaum' },
    { label: 'Bellary', value: 'Bellary' },
    { label: 'Betul', value: 'Betul' },
    { label: 'Bhadrak', value: 'Bhadrak' },
    { label: 'Bhagalpur', value: 'Bhagalpur' },
    { label: 'Bhandara', value: 'Bhandara' },
    { label: 'Bharatpur', value: 'Bharatpur' },
    { label: 'Bharuch', value: 'Bharuch' },
    { label: 'Bhavnagar', value: 'Bhavnagar' },
    { label: 'Bhilwara', value: 'Bhilwara' },
    { label: 'Bhind', value: 'Bhind' },
    { label: 'Bhiwani', value: 'Bhiwani' },
    { label: 'Bhojpur', value: 'Bhojpur' },
    { label: 'Bhopal', value: 'Bhopal' },
    { label: 'Bidar', value: 'Bidar' },
    { label: 'Bijapur', value: 'Bijapur' },
    { label: 'Bijapur', value: 'Bijapur' },
    { label: 'Bijnor', value: 'Bijnor' },
    { label: 'Bikaner', value: 'Bikaner' },
    { label: 'Bilaspur', value: 'Bilaspur' },
    { label: 'Bilaspur', value: 'Bilaspur' },
    { label: 'Birbhum', value: 'Birbhum' },
    { label: 'Bishnupur', value: 'Bishnupur' },
    { label: 'Bokaro', value: 'Bokaro' },
    { label: 'Bongaigaon', value: 'Bongaigaon' },
    { label: 'Boudh (Bauda)', value: 'Boudh (Bauda)' },
    { label: 'Budaun', value: 'Budaun' },
    { label: 'Bulandshahr', value: 'Bulandshahr' },
    { label: 'Buldhana', value: 'Buldhana' },
    { label: 'Bundi', value: 'Bundi' },
    { label: 'Burhanpur', value: 'Burhanpur' },
    { label: 'Buxar', value: 'Buxar' },
    { label: 'Cachar', value: 'Cachar' },
    { label: 'Central Delhi', value: 'Central Delhi' },
    { label: 'Chamarajnagar', value: 'Chamarajnagar' },
    { label: 'Chamba', value: 'Chamba' },
    { label: 'Chamoli', value: 'Chamoli' },
    { label: 'Champawat', value: 'Champawat' },
    { label: 'Champhai', value: 'Champhai' },
    { label: 'Chandauli', value: 'Chandauli' },
    { label: 'Chandel', value: 'Chandel' },
    { label: 'Chandigarh', value: 'Chandigarh' },
    { label: 'Chandrapur', value: 'Chandrapur' },
    { label: 'Changlang', value: 'Changlang' },
    { label: 'Chatra', value: 'Chatra' },
    { label: 'Chennai', value: 'Chennai' },
    { label: 'Chhatarpur', value: 'Chhatarpur' },
    { label: 'Chhatrapati Shahuji Maharaj Nagar', value: 'Chhatrapati Shahuji Maharaj Nagar' },
    { label: 'Chhindwara', value: 'Chhindwara' },
    { label: 'Chikkaballapur', value: 'Chikkaballapur' },
    { label: 'Chikkamagaluru', value: 'Chikkamagaluru' },
    { label: 'Chirang', value: 'Chirang' },
    { label: 'Chitradurga', value: 'Chitradurga' },
    { label: 'Chitrakoot', value: 'Chitrakoot' },
    { label: 'Chittoor', value: 'Chittoor' },
    { label: 'Chittorgarh', value: 'Chittorgarh' },
    { label: 'Churachandpur', value: 'Churachandpur' },
    { label: 'Churu', value: 'Churu' },
    { label: 'Coimbatore', value: 'Coimbatore' },
    { label: 'Cooch Behar', value: 'Cooch Behar' },
    { label: 'Cuddalore', value: 'Cuddalore' },
    { label: 'Cuttack', value: 'Cuttack' },
    { label: 'Dadra and Nagar Haveli', value: 'Dadra and Nagar Haveli' },
    { label: 'Dahod', value: 'Dahod' },
    { label: 'Dakshin Dinajpur', value: 'Dakshin Dinajpur' },
    { label: 'Dakshina Kannada', value: 'Dakshina Kannada' },
    { label: 'Daman', value: 'Daman' },
    { label: 'Damoh', value: 'Damoh' },
    { label: 'Dantewada', value: 'Dantewada' },
    { label: 'Darbhanga', value: 'Darbhanga' },
    { label: 'Darjeeling', value: 'Darjeeling' },
    { label: 'Darrang', value: 'Darrang' },
    { label: 'Datia', value: 'Datia' },
    { label: 'Dausa', value: 'Dausa' },
    { label: 'Davanagere', value: 'Davanagere' },
    { label: 'Debagarh (Deogarh)', value: 'Debagarh (Deogarh)' },
    { label: 'Dehradun', value: 'Dehradun' },
    { label: 'Deoghar', value: 'Deoghar' },
    { label: 'Deoria', value: 'Deoria' },
    { label: 'Dewas', value: 'Dewas' },
    { label: 'Dhalai', value: 'Dhalai' },
    { label: 'Dhamtari', value: 'Dhamtari' },
    { label: 'Dhanbad', value: 'Dhanbad' },
    { label: 'Dhar', value: 'Dhar' },
    { label: 'Dharmapuri', value: 'Dharmapuri' },
    { label: 'Dharwad', value: 'Dharwad' },
    { label: 'Dhemaji', value: 'Dhemaji' },
    { label: 'Dhenkanal', value: 'Dhenkanal' },
    { label: 'Dholpur', value: 'Dholpur' },
    { label: 'Dhubri', value: 'Dhubri' },
    { label: 'Dhule', value: 'Dhule' },
    { label: 'Dibang Valley', value: 'Dibang Valley' },
    { label: 'Dibrugarh', value: 'Dibrugarh' },
    { label: 'Dima Hasao', value: 'Dima Hasao' },
    { label: 'Dimapur', value: 'Dimapur' },
    { label: 'Dindigul', value: 'Dindigul' },
    { label: 'Dindori', value: 'Dindori' },
    { label: 'Diu', value: 'Diu' },
    { label: 'Doda', value: 'Doda' },
    { label: 'Dumka', value: 'Dumka' },
    { label: 'Dungapur', value: 'Dungapur' },
    { label: 'Durg', value: 'Durg' },
    { label: 'East Champaran', value: 'East Champaran' },
    { label: 'East Delhi', value: 'East Delhi' },
    { label: 'East Garo Hills', value: 'East Garo Hills' },
    { label: 'East Khasi Hills', value: 'East Khasi Hills' },
    { label: 'East Siang', value: 'East Siang' },
    { label: 'East Sikkim', value: 'East Sikkim' },
    { label: 'East Singhbhum', value: 'East Singhbhum' },
    { label: 'Eluru', value: 'Eluru' },
    { label: 'Ernakulam', value: 'Ernakulam' },
    { label: 'Erode', value: 'Erode' },
    { label: 'Etah', value: 'Etah' },
    { label: 'Etawah', value: 'Etawah' },
    { label: 'Faizabad', value: 'Faizabad' },
    { label: 'Faridabad', value: 'Faridabad' },
    { label: 'Faridkot', value: 'Faridkot' },
    { label: 'Farrukhabad', value: 'Farrukhabad' },
    { label: 'Fatehabad', value: 'Fatehabad' },
    { label: 'Fatehgarh Sahib', value: 'Fatehgarh Sahib' },
    { label: 'Fatehpur', value: 'Fatehpur' },
    { label: 'Fazilka', value: 'Fazilka' },
    { label: 'Firozabad', value: 'Firozabad' },
    { label: 'Firozpur', value: 'Firozpur' },
    { label: 'Gadag', value: 'Gadag' },
    { label: 'Gadchiroli', value: 'Gadchiroli' },
    { label: 'Gajapati', value: 'Gajapati' },
    { label: 'Ganderbal', value: 'Ganderbal' },
    { label: 'Gandhinagar', value: 'Gandhinagar' },
    { label: 'Ganganagar', value: 'Ganganagar' },
    { label: 'Ganjam', value: 'Ganjam' },
    { label: 'Garhwa', value: 'Garhwa' },
    { label: 'Gautam Buddh Nagar', value: 'Gautam Buddh Nagar' },
    { label: 'Gaya', value: 'Gaya' },
    { label: 'Ghaziabad', value: 'Ghaziabad' },
    { label: 'Ghazipur', value: 'Ghazipur' },
    { label: 'Giridih', value: 'Giridih' },
    { label: 'Goalpara', value: 'Goalpara' },
    { label: 'Godda', value: 'Godda' },
    { label: 'Golaghat', value: 'Golaghat' },
    { label: 'Gonda', value: 'Gonda' },
    { label: 'Gondia', value: 'Gondia' },
    { label: 'Gopalganj', value: 'Gopalganj' },
    { label: 'Gorakhpur', value: 'Gorakhpur' },
    { label: 'Gulbarga', value: 'Gulbarga' },
    { label: 'Gumla', value: 'Gumla' },
    { label: 'Guna', value: 'Guna' },
    { label: 'Guntur', value: 'Guntur' },
    { label: 'Gurdaspur', value: 'Gurdaspur' },
    { label: 'Gurgaon', value: 'Gurgaon' },
    { label: 'Gwalior', value: 'Gwalior' },
    { label: 'Hailakandi', value: 'Hailakandi' },
    { label: 'Hamirpur', value: 'Hamirpur' },
    { label: 'Hamirpur', value: 'Hamirpur' },
    { label: 'Hanumangarh', value: 'Hanumangarh' },
    { label: 'Harda', value: 'Harda' },
    { label: 'Hardoi', value: 'Hardoi' },
    { label: 'Haridwar', value: 'Haridwar' },
    { label: 'Hassan', value: 'Hassan' },
    { label: 'Haveri district', value: 'Haveri district' },
    { label: 'Hazaribag', value: 'Hazaribag' },
    { label: 'Hingoli', value: 'Hingoli' },
    { label: 'Hissar', value: 'Hissar' },
    { label: 'Hooghly', value: 'Hooghly' },
    { label: 'Hoshangabad', value: 'Hoshangabad' },
    { label: 'Hoshiarpur', value: 'Hoshiarpur' },
    { label: 'Howrah', value: 'Howrah' },
    { label: 'Hyderabad', value: 'Hyderabad' },
    { label: 'Hyderabad', value: 'Hyderabad' },
    { label: 'Idukki', value: 'Idukki' },
    { label: 'Imphal East', value: 'Imphal East' },
    { label: 'Imphal West', value: 'Imphal West' },
    { label: 'Indore', value: 'Indore' },
    { label: 'Jabalpur', value: 'Jabalpur' },
    { label: 'Jagatsinghpur', value: 'Jagatsinghpur' },
    { label: 'Jaintia Hills', value: 'Jaintia Hills' },
    { label: 'Jaipur', value: 'Jaipur' },
    { label: 'Jaisalmer', value: 'Jaisalmer' },
    { label: 'Jajpur', value: 'Jajpur' },
    { label: 'Jalandhar', value: 'Jalandhar' },
    { label: 'Jalaun', value: 'Jalaun' },
    { label: 'Jalgaon', value: 'Jalgaon' },
    { label: 'Jalna', value: 'Jalna' },
    { label: 'Jalore', value: 'Jalore' },
    { label: 'Jalpaiguri', value: 'Jalpaiguri' },
    { label: 'Jammu', value: 'Jammu' },
    { label: 'Jamnagar', value: 'Jamnagar' },
    { label: 'Jamtara', value: 'Jamtara' },
    { label: 'Jamui', value: 'Jamui' },
    { label: 'Janjgir-Champa', value: 'Janjgir-Champa' },
    { label: 'Jashpur', value: 'Jashpur' },
    { label: 'Jaunpur district', value: 'Jaunpur district' },
    { label: 'Jehanabad', value: 'Jehanabad' },
    { label: 'Jhabua', value: 'Jhabua' },
    { label: 'Jhajjar', value: 'Jhajjar' },
    { label: 'Jhalawar', value: 'Jhalawar' },
    { label: 'Jhansi', value: 'Jhansi' },
    { label: 'Jharsuguda', value: 'Jharsuguda' },
    { label: 'Jhunjhunu', value: 'Jhunjhunu' },
    { label: 'Jind', value: 'Jind' },
    { label: 'Jodhpur', value: 'Jodhpur' },
    { label: 'Jorhat', value: 'Jorhat' },
    { label: 'Junagadh', value: 'Junagadh' },
    { label: 'Jyotiba Phule Nagar', value: 'Jyotiba Phule Nagar' },
    { label: 'Kabirdham (formerly Kawardha)', value: 'Kabirdham (formerly Kawardha)' },
    { label: 'Kadapa', value: 'Kadapa' },
    { label: 'Kaimur', value: 'Kaimur' },
    { label: 'Kaithal', value: 'Kaithal' },
    { label: 'Kakinada', value: 'Kakinada' },
    { label: 'Kalahandi', value: 'Kalahandi' },
    { label: 'Kamrup', value: 'Kamrup' },
    { label: 'Kamrup Metropolitan', value: 'Kamrup Metropolitan' },
    { label: 'Kanchipuram', value: 'Kanchipuram' },
    { label: 'Kandhamal', value: 'Kandhamal' },
    { label: 'Kangra', value: 'Kangra' },
    { label: 'Kanker', value: 'Kanker' },
    { label: 'Kannauj', value: 'Kannauj' },
    { label: 'Kannur', value: 'Kannur' },
    { label: 'Kanpur', value: 'Kanpur' },
    { label: 'Kanshi Ram Nagar', value: 'Kanshi Ram Nagar' },
    { label: 'Kanyakumari', value: 'Kanyakumari' },
    { label: 'Kapurthala', value: 'Kapurthala' },
    { label: 'Karaikal', value: 'Karaikal' },
    { label: 'Karauli', value: 'Karauli' },
    { label: 'Karbi Anglong', value: 'Karbi Anglong' },
    { label: 'Kargil', value: 'Kargil' },
    { label: 'Karimganj', value: 'Karimganj' },
    { label: 'Karimnagar', value: 'Karimnagar' },
    { label: 'Karnal', value: 'Karnal' },
    { label: 'Karur', value: 'Karur' },
    { label: 'Kasaragod', value: 'Kasaragod' },
    { label: 'Kathua', value: 'Kathua' },
    { label: 'Katihar', value: 'Katihar' },
    { label: 'Katni', value: 'Katni' },
    { label: 'Kaushambi', value: 'Kaushambi' },
    { label: 'Kendrapara', value: 'Kendrapara' },
    { label: 'Kendujhar (Keonjhar)', value: 'Kendujhar (Keonjhar)' },
    { label: 'Khagaria', value: 'Khagaria' },
    { label: 'Khammam', value: 'Khammam' },
    { label: 'Khandwa (East Nimar)', value: 'Khandwa (East Nimar)' },
    { label: 'Khargone (West Nimar)', value: 'Khargone (West Nimar)' },
    { label: 'Kheda', value: 'Kheda' },
    { label: 'Khordha', value: 'Khordha' },
    { label: 'Khowai', value: 'Khowai' },
    { label: 'Khunti', value: 'Khunti' },
    { label: 'Kinnaur', value: 'Kinnaur' },
    { label: 'Kishanganj', value: 'Kishanganj' },
    { label: 'Kishtwar', value: 'Kishtwar' },
    { label: 'Kodagu', value: 'Kodagu' },
    { label: 'Koderma', value: 'Koderma' },
    { label: 'Kohima', value: 'Kohima' },
    { label: 'Kokrajhar', value: 'Kokrajhar' },
    { label: 'Kolar', value: 'Kolar' },
    { label: 'Kolasib', value: 'Kolasib' },
    { label: 'Kolhapur', value: 'Kolhapur' },
    { label: 'Kolkata', value: 'Kolkata' },
    { label: 'Kollam', value: 'Kollam' },
    { label: 'Koppal', value: 'Koppal' },
    { label: 'Koraput', value: 'Koraput' },
    { label: 'Korba', value: 'Korba' },
    { label: 'Koriya', value: 'Koriya' },
    { label: 'Kota', value: 'Kota' },
    { label: 'Kottayam', value: 'Kottayam' },
    { label: 'Kozhikode', value: 'Kozhikode' },
    { label: 'Krishna', value: 'Krishna' },
    { label: 'Kulgam', value: 'Kulgam' },
    { label: 'Kullu', value: 'Kullu' },
    { label: 'Kupwara', value: 'Kupwara' },
    { label: 'Kurnool', value: 'Kurnool' },
    { label: 'Kurukshetra', value: 'Kurukshetra' },
    { label: 'Kurung Kumey', value: 'Kurung Kumey' },
    { label: 'Kushinagar', value: 'Kushinagar' },
    { label: 'Kutch', value: 'Kutch' },
    { label: 'Lahaul and Spiti', value: 'Lahaul and Spiti' },
    { label: 'Lakhimpur', value: 'Lakhimpur' },
    { label: 'Lakhimpur Kheri', value: 'Lakhimpur Kheri' },
    { label: 'Lakhisarai', value: 'Lakhisarai' },
    { label: 'Lalitpur', value: 'Lalitpur' },
    { label: 'Latehar', value: 'Latehar' },
    { label: 'Latur', value: 'Latur' },
    { label: 'Lawngtlai', value: 'Lawngtlai' },
    { label: 'Leh', value: 'Leh' },
    { label: 'Lohardaga', value: 'Lohardaga' },
    { label: 'Lohit', value: 'Lohit' },
    { label: 'Lower Dibang Valley', value: 'Lower Dibang Valley' },
    { label: 'Lower Subansiri', value: 'Lower Subansiri' },
    { label: 'Lucknow', value: 'Lucknow' },
    { label: 'Ludhiana', value: 'Ludhiana' },
    { label: 'Lunglei', value: 'Lunglei' },
    { label: 'Madhepura', value: 'Madhepura' },
    { label: 'Madhubani', value: 'Madhubani' },
    { label: 'Madurai', value: 'Madurai' },
    { label: 'Mahamaya Nagar', value: 'Mahamaya Nagar' },
    { label: 'Maharajganj', value: 'Maharajganj' },
    { label: 'Mahasamund', value: 'Mahasamund' },
    { label: 'Mahbubnagar', value: 'Mahbubnagar' },
    { label: 'Mahe', value: 'Mahe' },
    { label: 'Mahendragarh', value: 'Mahendragarh' },
    { label: 'Mahoba', value: 'Mahoba' },
    { label: 'Mainpuri', value: 'Mainpuri' },
    { label: 'Malappuram', value: 'Malappuram' },
    { label: 'Maldah', value: 'Maldah' },
    { label: 'Malkangiri', value: 'Malkangiri' },
    { label: 'Mamit', value: 'Mamit' },
    { label: 'Mandi', value: 'Mandi' },
    { label: 'Mandla', value: 'Mandla' },
    { label: 'Mandsaur', value: 'Mandsaur' },
    { label: 'Mandya', value: 'Mandya' },
    { label: 'Mansa', value: 'Mansa' },
    { label: 'Marigaon', value: 'Marigaon' },
    { label: 'Mathura', value: 'Mathura' },
    { label: 'Mau', value: 'Mau' },
    { label: 'Mayurbhanj', value: 'Mayurbhanj' },
    { label: 'Medak', value: 'Medak' },
    { label: 'Meerut', value: 'Meerut' },
    { label: 'Mehsana', value: 'Mehsana' },
    { label: 'Mewat', value: 'Mewat' },
    { label: 'Mirzapur', value: 'Mirzapur' },
    { label: 'Moga', value: 'Moga' },
    { label: 'Mokokchung', value: 'Mokokchung' },
    { label: 'Mon', value: 'Mon' },
    { label: 'Moradabad', value: 'Moradabad' },
    { label: 'Morena', value: 'Morena' },
    { label: 'Mumbai City', value: 'Mumbai City' },
    { label: 'Mumbai suburban', value: 'Mumbai suburban' },
    { label: 'Munger', value: 'Munger' },
    { label: 'Murshidabad', value: 'Murshidabad' },
    { label: 'Muzaffarnagar', value: 'Muzaffarnagar' },
    { label: 'Muzaffarpur', value: 'Muzaffarpur' },
    { label: 'Mysore', value: 'Mysore' },
    { label: 'Nabarangpur', value: 'Nabarangpur' },
    { label: 'Nadia', value: 'Nadia' },
    { label: 'Nagaon', value: 'Nagaon' },
    { label: 'Nagapattinam', value: 'Nagapattinam' },
    { label: 'Nagaur', value: 'Nagaur' },
    { label: 'Nagpur', value: 'Nagpur' },
    { label: 'Nainital', value: 'Nainital' },
    { label: 'Nalanda', value: 'Nalanda' },
    { label: 'Nalbari', value: 'Nalbari' },
    { label: 'Nalgonda', value: 'Nalgonda' },
    { label: 'Namakkal', value: 'Namakkal' },
    { label: 'Nanded', value: 'Nanded' },
    { label: 'Nandurbar', value: 'Nandurbar' },
    { label: 'Narayanpur', value: 'Narayanpur' },
    { label: 'Narmada', value: 'Narmada' },
    { label: 'Narsinghpur', value: 'Narsinghpur' },
    { label: 'Nashik', value: 'Nashik' },
    { label: 'Navsari', value: 'Navsari' },
    { label: 'Nawada', value: 'Nawada' },
    { label: 'Nawanshahr', value: 'Nawanshahr' },
    { label: 'Nayagarh', value: 'Nayagarh' },
    { label: 'Neemuch', value: 'Neemuch' },
    { label: 'Nellore', value: 'Nellore' },
    { label: 'New Delhi', value: 'New Delhi' },
    { label: 'Nilgiris', value: 'Nilgiris' },
    { label: 'Nizamabad', value: 'Nizamabad' },
    { label: 'North 24 Parganas', value: 'North 24 Parganas' },
    { label: 'North Delhi', value: 'North Delhi' },
    { label: 'North East Delhi', value: 'North East Delhi' },
    { label: 'North Goa', value: 'North Goa' },
    { label: 'North Sikkim', value: 'North Sikkim' },
    { label: 'North Tripura', value: 'North Tripura' },
    { label: 'North West Delhi', value: 'North West Delhi' },
    { label: 'Nuapada', value: 'Nuapada' },
    { label: 'Ongole', value: 'Ongole' },
    { label: 'Osmanabad', value: 'Osmanabad' },
    { label: 'Pakur', value: 'Pakur' },
    { label: 'Palakkad', value: 'Palakkad' },
    { label: 'Palamu', value: 'Palamu' },
    { label: 'Pali', value: 'Pali' },
    { label: 'Palwal', value: 'Palwal' },
    { label: 'Panchkula', value: 'Panchkula' },
    { label: 'Panchmahal', value: 'Panchmahal' },
    { label: 'Panchsheel Nagar district (Hapur)', value: 'Panchsheel Nagar district (Hapur)' },
    { label: 'Panipat', value: 'Panipat' },
    { label: 'Panna', value: 'Panna' },
    { label: 'Papum Pare', value: 'Papum Pare' },
    { label: 'Parbhani', value: 'Parbhani' },
    { label: 'Paschim Medinipur', value: 'Paschim Medinipur' },
    { label: 'Patan', value: 'Patan' },
    { label: 'Pathanamthitta', value: 'Pathanamthitta' },
    { label: 'Pathankot', value: 'Pathankot' },
    { label: 'Patiala', value: 'Patiala' },
    { label: 'Patna', value: 'Patna' },
    { label: 'Pauri Garhwal', value: 'Pauri Garhwal' },
    { label: 'Perambalur', value: 'Perambalur' },
    { label: 'Phek', value: 'Phek' },
    { label: 'Pilibhit', value: 'Pilibhit' },
    { label: 'Pithoragarh', value: 'Pithoragarh' },
    { label: 'Pondicherry', value: 'Pondicherry' },
    { label: 'Poonch', value: 'Poonch' },
    { label: 'Porbandar', value: 'Porbandar' },
    { label: 'Pratapgarh', value: 'Pratapgarh' },
    { label: 'Pratapgarh', value: 'Pratapgarh' },
    { label: 'Pudukkottai', value: 'Pudukkottai' },
    { label: 'Pulwama', value: 'Pulwama' },
    { label: 'Pune', value: 'Pune' },
    { label: 'Purba Medinipur', value: 'Purba Medinipur' },
    { label: 'Puri', value: 'Puri' },
    { label: 'Purnia', value: 'Purnia' },
    { label: 'Purulia', value: 'Purulia' },
    { label: 'Raebareli', value: 'Raebareli' },
    { label: 'Raichur', value: 'Raichur' },
    { label: 'Raigad', value: 'Raigad' },
    { label: 'Raigarh', value: 'Raigarh' },
    { label: 'Raipur', value: 'Raipur' },
    { label: 'Raisen', value: 'Raisen' },
    { label: 'Rajauri', value: 'Rajauri' },
    { label: 'Rajgarh', value: 'Rajgarh' },
    { label: 'Rajkot', value: 'Rajkot' },
    { label: 'Rajnandgaon', value: 'Rajnandgaon' },
    { label: 'Rajsamand', value: 'Rajsamand' },
    { label: 'Ramabai Nagar (Kanpur Dehat)', value: 'Ramabai Nagar (Kanpur Dehat)' },
    { label: 'Ramanagara', value: 'Ramanagara' },
    { label: 'Ramanathapuram', value: 'Ramanathapuram' },
    { label: 'Ramban', value: 'Ramban' },
    { label: 'Ramgarh', value: 'Ramgarh' },
    { label: 'Rampur', value: 'Rampur' },
    { label: 'Ranchi', value: 'Ranchi' },
    { label: 'Ratlam', value: 'Ratlam' },
    { label: 'Ratnagiri', value: 'Ratnagiri' },
    { label: 'Rayagada', value: 'Rayagada' },
    { label: 'Reasi', value: 'Reasi' },
    { label: 'Rewa', value: 'Rewa' },
    { label: 'Rewari', value: 'Rewari' },
    { label: 'Ri Bhoi', value: 'Ri Bhoi' },
    { label: 'Rohtak', value: 'Rohtak' },
    { label: 'Rohtas', value: 'Rohtas' },
    { label: 'Rudraprayag', value: 'Rudraprayag' },
    { label: 'Rupnagar', value: 'Rupnagar' },
    { label: 'Sabarkantha', value: 'Sabarkantha' },
    { label: 'Sagar', value: 'Sagar' },
    { label: 'Saharanpur', value: 'Saharanpur' },
    { label: 'Saharsa', value: 'Saharsa' },
    { label: 'Sahibganj', value: 'Sahibganj' },
    { label: 'Saiha', value: 'Saiha' },
    { label: 'Salem', value: 'Salem' },
    { label: 'Samastipur', value: 'Samastipur' },
    { label: 'Samba', value: 'Samba' },
    { label: 'Sambalpur', value: 'Sambalpur' },
    { label: 'Sangli', value: 'Sangli' },
    { label: 'Sangrur', value: 'Sangrur' },
    { label: 'Sant Kabir Nagar', value: 'Sant Kabir Nagar' },
    { label: 'Sant Ravidas Nagar', value: 'Sant Ravidas Nagar' },
    { label: 'Saran', value: 'Saran' },
    { label: 'Satara', value: 'Satara' },
    { label: 'Satna', value: 'Satna' },
    { label: 'Sawai Madhopur', value: 'Sawai Madhopur' },
    { label: 'Sehore', value: 'Sehore' },
    { label: 'Senapati', value: 'Senapati' },
    { label: 'Seoni', value: 'Seoni' },
    { label: 'Seraikela Kharsawan', value: 'Seraikela Kharsawan' },
    { label: 'Serchhip', value: 'Serchhip' },
    { label: 'Shahdol', value: 'Shahdol' },
    { label: 'Shahjahanpur', value: 'Shahjahanpur' },
    { label: 'Shajapur', value: 'Shajapur' },
    { label: 'Shamli', value: 'Shamli' },
    { label: 'Sheikhpura', value: 'Sheikhpura' },
    { label: 'Sheohar', value: 'Sheohar' },
    { label: 'Sheopur', value: 'Sheopur' },
    { label: 'Shimla', value: 'Shimla' },
    { label: 'Shimoga', value: 'Shimoga' },
    { label: 'Shivpuri', value: 'Shivpuri' },
    { label: 'Shopian', value: 'Shopian' },
    { label: 'Shravasti', value: 'Shravasti' },
    { label: 'Sibsagar', value: 'Sibsagar' },
    { label: 'Siddharthnagar', value: 'Siddharthnagar' },
    { label: 'Sidhi', value: 'Sidhi' },
    { label: 'Sikar', value: 'Sikar' },
    { label: 'Simdega', value: 'Simdega' },
    { label: 'Sindhudurg', value: 'Sindhudurg' },
    { label: 'Singrauli', value: 'Singrauli' },
    { label: 'Sirmaur', value: 'Sirmaur' },
    { label: 'Sirohi', value: 'Sirohi' },
    { label: 'Sirsa', value: 'Sirsa' },
    { label: 'Sitamarhi', value: 'Sitamarhi' },
    { label: 'Sitapur', value: 'Sitapur' },
    { label: 'Sivaganga', value: 'Sivaganga' },
    { label: 'Siwan', value: 'Siwan' },
    { label: 'Solan', value: 'Solan' },
    { label: 'Solapur', value: 'Solapur' },
    { label: 'Sonbhadra', value: 'Sonbhadra' },
    { label: 'Sonipat', value: 'Sonipat' },
    { label: 'Sonitpur', value: 'Sonitpur' },
    { label: 'South 24 Parganas', value: 'South 24 Parganas' },
    { label: 'South Delhi', value: 'South Delhi' },
    { label: 'South Garo Hills', value: 'South Garo Hills' },
    { label: 'South Goa', value: 'South Goa' },
    { label: 'South Sikkim', value: 'South Sikkim' },
    { label: 'South Tripura', value: 'South Tripura' },
    { label: 'South West Delhi', value: 'South West Delhi' },
    { label: 'Sri Muktsar Sahib', value: 'Sri Muktsar Sahib' },
    { label: 'Srikakulam', value: 'Srikakulam' },
    { label: 'Srinagar', value: 'Srinagar' },
    { label: 'Subarnapur (Sonepur)', value: 'Subarnapur (Sonepur)' },
    { label: 'Sultanpur', value: 'Sultanpur' },
    { label: 'Sundergarh', value: 'Sundergarh' },
    { label: 'Supaul', value: 'Supaul' },
    { label: 'Surat', value: 'Surat' },
    { label: 'Surendranagar', value: 'Surendranagar' },
    { label: 'Surguja', value: 'Surguja' },
    { label: 'Tamenglong', value: 'Tamenglong' },
    { label: 'Tarn Taran', value: 'Tarn Taran' },
    { label: 'Tawang', value: 'Tawang' },
    { label: 'Tehri Garhwal', value: 'Tehri Garhwal' },
    { label: 'Thane', value: 'Thane' },
    { label: 'Thanjavur', value: 'Thanjavur' },
    { label: 'The Dangs', value: 'The Dangs' },
    { label: 'Theni', value: 'Theni' },
    { label: 'Thiruvananthapuram', value: 'Thiruvananthapuram' },
    { label: 'Thoothukudi', value: 'Thoothukudi' },
    { label: 'Thoubal', value: 'Thoubal' },
    { label: 'Thrissur', value: 'Thrissur' },
    { label: 'Tikamgarh', value: 'Tikamgarh' },
    { label: 'Tinsukia', value: 'Tinsukia' },
    { label: 'Tirap', value: 'Tirap' },
    { label: 'Tiruchirappalli', value: 'Tiruchirappalli' },
    { label: 'Tirunelveli', value: 'Tirunelveli' },
    { label: 'Tirupur', value: 'Tirupur' },
    { label: 'Tiruvallur', value: 'Tiruvallur' },
    { label: 'Tiruvannamalai', value: 'Tiruvannamalai' },
    { label: 'Tiruvarur', value: 'Tiruvarur' },
    { label: 'Tonk', value: 'Tonk' },
    { label: 'Tuensang', value: 'Tuensang' },
    { label: 'Tumkur', value: 'Tumkur' },
    { label: 'Udaipur', value: 'Udaipur' },
    { label: 'Udalguri', value: 'Udalguri' },
    { label: 'Udham Singh Nagar', value: 'Udham Singh Nagar' },
    { label: 'Udhampur', value: 'Udhampur' },
    { label: 'Udupi', value: 'Udupi' },
    { label: 'Ujjain', value: 'Ujjain' },
    { label: 'Ukhrul', value: 'Ukhrul' },
    { label: 'Umaria', value: 'Umaria' },
    { label: 'Una', value: 'Una' },
    { label: 'Unnao', value: 'Unnao' },
    { label: 'Upper Siang', value: 'Upper Siang' },
    { label: 'Upper Subansiri', value: 'Upper Subansiri' },
    { label: 'Uttar Dinajpur', value: 'Uttar Dinajpur' },
    { label: 'Uttara Kannada', value: 'Uttara Kannada' },
    { label: 'Uttarkashi', value: 'Uttarkashi' },
    { label: 'Vadodara', value: 'Vadodara' },
    { label: 'Vaishali', value: 'Vaishali' },
    { label: 'Valsad', value: 'Valsad' },
    { label: 'Varanasi', value: 'Varanasi' },
    { label: 'Vellore', value: 'Vellore' },
    { label: 'Vidisha', value: 'Vidisha' },
    { label: 'Viluppuram', value: 'Viluppuram' },
    { label: 'Virudhunagar', value: 'Virudhunagar' },
    { label: 'Visakhapatnam', value: 'Visakhapatnam' },
    { label: 'Vizianagaram', value: 'Vizianagaram' },
    { label: 'Vyara', value: 'Vyara' },
    { label: 'Warangal', value: 'Warangal' },
    { label: 'Wardha', value: 'Wardha' },
    { label: 'Washim', value: 'Washim' },
    { label: 'Wayanad', value: 'Wayanad' },
    { label: 'West Champaran', value: 'West Champaran' },
    { label: 'West Delhi', value: 'West Delhi' },
    { label: 'West Garo Hills', value: 'West Garo Hills' },
    { label: 'West Kameng', value: 'West Kameng' },
    { label: 'West Khasi Hills', value: 'West Khasi Hills' },
    { label: 'West Siang', value: 'West Siang' },
    { label: 'West Sikkim', value: 'West Sikkim' },
    { label: 'West Singhbhum', value: 'West Singhbhum' },
    { label: 'West Tripura', value: 'West Tripura' },
    { label: 'Wokha', value: 'Wokha' },
    { label: 'Yadgir', value: 'Yadgir' },
    { label: 'Yamuna Nagar', value: 'Yamuna Nagar' },
    { label: 'Yanam', value: 'Yanam' },
    { label: 'Yavatmal', value: 'Yavatmal' },
    { label: 'Zunheboto', value: 'Zunheboto' },
]

function CalculateFilters() {

    const [optionSelected, setOptionSelected] = useState(null);
    const [gender, setGender] = useState('');
    const [categories, setCategories] = useState(null);
    const [region, setRegion] = useState(null);
    const [city, setCity] = useState(null);
    const [ageString, setAgeString] = useState('');
    const [categoryString, setCategoryString] = useState('');
    const [cityString, setCityString] = useState('');
    const [regionString, setRegionString] = useState('')
    const params = useParams();
    const navigate = useNavigate();

    const handleNext = () => {
        navigate(`/calculate/${params.budget}/${params.followerRange}/${params.deliverables}/demography=age=${ageString}&gender=${gender.value}&category=${categoryString}&city=${cityString}&region=${regionString}`)
    }

    const MySelect = props => {
        if (props.allowSelectAll) {
            return (
                <ReactSelect
                    {...props}
                    options={[props.allOption, ...props.options]}
                    onChange={selected => {
                        if (
                            selected !== null &&
                            selected.length > 0 &&
                            selected[selected.length - 1].value === props.allOption.value
                        ) {
                            return props.onChange(props.options);
                        }
                        return props.onChange(selected);
                    }}
                />
            );
        }

        return <ReactSelect {...props} />;
    };

    MySelect.propTypes = {
        options: PropTypes.array,
        value: PropTypes.any,
        onChange: PropTypes.func,
        allowSelectAll: PropTypes.bool,
        allOption: PropTypes.shape({
            label: PropTypes.string,
            value: PropTypes.string
        })
    };

    MySelect.defaultProps = {
        allOption: {
            label: "Select all",
            value: "*"
        }
    };

    const MultiValue = props => (
        <components.MultiValue {...props}>
            <span>{props.data.label}</span>
        </components.MultiValue>
    );

    const Option = props => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };

    useEffect(() => {
        let str = '';
        if (optionSelected) {
            if (optionSelected.length > 0) {
                optionSelected.map((item) => {
                    str += `&${item.value}`
                    setAgeString(str.substring(1))
                })
            }
        }
        else if (!optionSelected) {
            setAgeString('none')
        }
    }, [optionSelected])

    useEffect(() => {
        let str = '';
        if (categories) {
            if (categories.length > 0) {
                categories.map((item) => {
                    str += `&${item.value}`
                    setCategoryString(str.substring(1))
                })
            }
        }
        else if (!categories) {
            setCategoryString('none')
        }
    }, [categories])

    useEffect(() => {
        let str = '';
        if (region) {
            if (region.length > 0) {
                region.map((item) => {
                    str += `&${item.value}`
                    setRegionString(str.substring(1))
                })
            }
        }
        else if (!region) {
            setRegionString('none')
        }
    }, [region])

    useEffect(() => {
        let str = '';
        if (city) {
            if (city.length > 0) {
                city.map((item) => {
                    str += `&${item.value}`
                    setCityString(str.substring(1))
                })
            }
        } else {
            setCityString('none')
        }
    }, [city])


    return (
        <div className="calculate3_container row no-gutters">
            <div className='col-lg-2 col-md-2 col-sm-2 col-xs-2  col-2'>
                <Navbar />
            </div>
            <div className='middle_pane_calculate col-lg-10 col-sm-10 col-md-10 col-xs-10 col-10'>
                <TopBar />
                <div className='middle_pane_content row no-gutters'>
                    <div className='steps_pane col-lg-3 col-md-3 col-sm-0 col-xs-0 col-0'>
                        <div className='steps_pane_part_inactive' style={{ borderLeft: 'solid 0.313rem #357AFF' }}>
                            <div className='steps_pane_title'>Step 1</div>
                            <div className='followers_title'>
                                Followers
                            </div>
                            <div className='followers_count'>
                                {NFormatter(params.followerRange.substring(params.followerRange.indexOf('=') + 1).replace('&', ' - '))}
                            </div>
                            <div className='budget_influencers_title'>Budget / Influencers</div>
                            <div className='budget_influencers_value'>
                                {
                                    params.budget.includes('budget') ?
                                        '₹' + params.budget.substring(params.budget.indexOf('=') + 1)
                                        :
                                        params.budget.substring(params.budget.indexOf('=') + 1) + ' Influencers'
                                }
                            </div>
                        </div>
                        <div className='steps_pane_part_inactive' style={{ borderLeft: 'solid 0.313rem #D04B4B' }}>
                            <div className='steps_pane_title'>Step 2</div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('l=') + 2)[0]}</div>
                                    <div className='deliverables_title'>Reels</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('t=') + 2)[0]}</div>
                                    <div className='deliverables_title'>Static posts</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('os=') + 3)[0]}</div>
                                    <div className='deliverables_title'>Videos</div>
                                </div>
                            </div>
                            <div className='deliverables'>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('stories=') + 8)[0]}</div>
                                    <div className='deliverables_title'>Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('swipeupStories=') + 15)[0]}</div>
                                    <div className='deliverables_title'>Swipeup Stories</div>
                                </div>
                                <div className='deliverables_pane'>
                                    <div className='deliverables_value'>{params.deliverables.substring(params.deliverables.indexOf('v=') + 2)[0]}</div>
                                    <div className='deliverables_title'>IGTV</div>
                                </div>
                            </div>
                        </div>
                        <div className='steps_pane_part' style={{ borderLeft: 'solid 0.313rem #32A737', paddingLeft: '2rem', paddingRight: '1rem', paddingTop: '1rem', paddingBottom: '0.25rem' }}>
                            <div className='steps_pane_title'>Step 3</div>
                            <div className='filter_pane'>
                                <img src={bdayIcon} /><div className='filter_value'>
                                    {
                                        optionSelected ?
                                            optionSelected.length > 0 ?
                                                optionSelected.length + 'age group'
                                                :
                                                '--'
                                            :
                                            null
                                    }
                                    , {gender.value}</div>
                            </div>
                            <div className='filter_pane'>
                                <img src={categoryIcon} /><div className='filter_value'>
                                    {categories ?
                                        categories.length > 0 ?
                                            categories.length + 'categories'
                                            :
                                            '--'
                                        : null
                                    }
                                </div>
                            </div>
                            <div className='filter_pane'>
                                <img src={locationIcon} /><div className='filter_value'> -- </div>
                            </div>
                        </div>
                        <div className='steps_pane_part_inactive'>
                            <div className='steps_pane_title'>Step 4</div>
                            <div className='cost_title'>Estimated Cost</div>
                            <div className='cost_value'> ₹ --</div>
                        </div>
                    </div>
                    <div className="content_pane col-lg-6 col-md-9 col-sm-12 col-xs-12 col-12">
                        <div className='step_count'>STEP 3</div>
                        <div className='step_title'>
                            Target Demographies
                        </div>
                        <div className="content_title">
                            Set the age and gender of your target audience
                        </div>
                        <div className="pane_1">
                            <div className="filter_1">
                                <label>Age group(s)</label>
                                <MySelect
                                    options={ageGroup}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    components={{ Option, MultiValue }}
                                    onChange={setOptionSelected}
                                    allowSelectAll={true}
                                    value={optionSelected}
                                    blurInputOnSelect={false}
                                    className="filter_field_select"
                                />
                                {/* <Input className="filter_field" /> */}
                            </div>
                            <div className="filter_1">
                                <label style={{ marginTop: '2.2rem' }}>Gender</label>
                                <ReactSelect
                                    options={genderOptions}
                                    onChange={setGender}
                                    value={gender}
                                    className="filter_field_select"
                                />
                                {/* <Input className="filter_field" /> */}
                            </div>
                        </div>
                        <div className="pane_2_title">
                            Set the age and gender of your target audience
                        </div>
                        <div className="pane_2">
                            <div className="filter_2">
                                <label>Categories / Keywords</label>
                                <MySelect
                                    options={categoryOptions}
                                    onChange={setCategories}
                                    value={categories}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    components={{ Option, MultiValue }}
                                    allowSelectAll={true}
                                    className="filter_field_select"
                                />
                                {/* <Input className="filter_field" /> */}
                            </div>
                        </div>
                        <div className="pane_3_title">
                            Select the geographical region and/or major cities
                            to target
                        </div>
                        <div className="pane_3">
                            <div className="pane_3_filter">
                                <Input type="checkbox" className="checkbox_input" />
                                <label>State</label>
                                <MySelect
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    components={{ Option, MultiValue }}
                                    className="filter_field_select"
                                    value={region}
                                    allowSelectAll={true}
                                    onChange={setRegion}
                                    options={regionOptions}
                                />
                                {/* <Input className="filter_field" /> */}
                            </div>
                            <div className="pane_3_filter" style={{ marginTop: '5rem' }}>
                                <Input type="checkbox" className="checkbox_input" />
                                <label>Cities</label>
                                <MySelect
                                    options={cityOptions}
                                    isMulti
                                    closeMenuOnSelect={false}
                                    hideSelectedOptions={false}
                                    components={{ Option, MultiValue }}
                                    allowSelectAll={true}
                                    className="filter_field_select"
                                    value={city}
                                    onChange={setCity}
                                />
                                {/* <Input className="filter_field" /> */}
                            </div>
                        </div>
                        <div>
                        </div>
                        <div>
                            <Button onClick={handleNext} className='next_btn'>Next</Button>
                        </div>
                    </div>
                    <div className="right_pane col-lg-3 col-md-0 col-sm-0 col-xs-0 col-0">
                        <div className="image_1"></div>
                        {/* <div className="image_2"></div> */}
                        {/* <span className='indicator' style={{ marginLeft: '2.5rem' }}>Specific</span>
                        <span className='indicator' style={{ marginLeft: '12rem' }}>Broad</span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CalculateFilters;